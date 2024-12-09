import QRCode from "qrcode";

const url = process.env.URL

export const generateId = async () => {
  const res = await fetch(`/api/generate-id?${Date.now()}`);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
  return await res.json();
};

export const generateQRCode = async (challenge: any) => {
  const payload = {
    challenge: challenge.id,
    domain: url,
    credentialQuery: [{ type: "Filipizen" }],
    service: "/authenticate",
  };

  return await QRCode.toDataURL(JSON.stringify(payload), {
    errorCorrectionLevel: 'H',
  });
};
