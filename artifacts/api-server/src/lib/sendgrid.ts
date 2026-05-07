import sgMail from "@sendgrid/mail";

type Conn = { settings?: { api_key?: string; from_email?: string } };

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? "depl " + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) throw new Error("X-Replit-Token not found for repl/depl");
  if (!hostname) throw new Error("REPLIT_CONNECTORS_HOSTNAME not set");

  const res = await fetch(
    "https://" +
      hostname +
      "/api/v2/connection?include_secrets=true&connector_names=sendgrid",
    {
      headers: { Accept: "application/json", "X-Replit-Token": xReplitToken },
    },
  );
  const data = (await res.json()) as { items?: Conn[] };
  const conn = data.items?.[0];
  if (!conn || !conn.settings?.api_key || !conn.settings?.from_email) {
    throw new Error("SendGrid not connected");
  }
  return { apiKey: conn.settings.api_key, email: conn.settings.from_email };
}

export async function getUncachableSendGridClient() {
  const { apiKey, email } = await getCredentials();
  sgMail.setApiKey(apiKey);
  return { client: sgMail, fromEmail: email };
}
