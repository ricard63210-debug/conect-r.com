import { logger } from "./logger";

// Sends a lead alert SMS to the team. Never throws: a failed SMS must not break the chat flow.
export async function sendLeadSms(body: string): Promise<boolean> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const apiKeySid = process.env.TWILIO_API_KEY_SID;
  const apiKeySecret = process.env.TWILIO_API_KEY_SECRET;
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
  const to = process.env.LEAD_ALERT_PHONE;

  if (!accountSid || !apiKeySid || !apiKeySecret || !messagingServiceSid || !to) {
    logger.error("lead SMS skipped: Twilio env vars missing");
    return false;
  }

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${apiKeySid}:${apiKeySecret}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ To: to, MessagingServiceSid: messagingServiceSid, Body: body }),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!res.ok) {
      logger.error({ status: res.status, error: await res.text() }, "lead SMS failed");
      return false;
    }
    return true;
  } catch (err) {
    logger.error({ err }, "lead SMS failed");
    return false;
  }
}
