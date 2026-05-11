export const CONTACT = {
  phoneRaw: "+573025523528",
  phoneDisplay: "+57 302 552 3528",
  email: "onyxvip.agency@gmail.com",
};

export function whatsappUrl(message = "Hola, me interesa agendar una reunión sobre WATSON.") {
  const num = CONTACT.phoneRaw.replace(/\D/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(subject = "Solicitud de reunión · WATSON", body = "") {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  return `mailto:${CONTACT.email}?${params.toString()}`;
}
