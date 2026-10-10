import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import { getT } from "@/lib/translations";

const CONTACT_PHONE = "+19168120873";

// children and message are optional; without them it is the usual "Contact us" button
export default function ContactButton({
  className,
  children,
  message,
}: {
  className?: string;
  children?: ReactNode;
  message?: string;
}) {
  const { lang } = useLang();
  const T = getT(lang);

  return (
    <a
      href={`sms:${CONTACT_PHONE}?&body=${encodeURIComponent(message ?? T.global.contactSms)}`}
      className={className}
    >
      {children ?? T.global.contactBtn}
    </a>
  );
}
