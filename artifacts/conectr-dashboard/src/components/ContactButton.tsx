import { useLang } from "@/lib/i18n";
import { getT } from "@/lib/translations";

const CONTACT_PHONE = "+19168120873";

export default function ContactButton({ className }: { className?: string }) {
  const { lang } = useLang();
  const T = getT(lang);

  return (
    <a
      href={`sms:${CONTACT_PHONE}?&body=${encodeURIComponent(T.global.contactSms)}`}
      className={className}
    >
      {T.global.contactBtn}
    </a>
  );
}
