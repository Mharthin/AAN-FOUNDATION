const PAYSTACK_API = "https://api.paystack.co";

function getSecretKey() {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new Error("PAYSTACK_SECRET_KEY is not configured.");
  return key;
}

export async function initializePaystackTransaction(input: {
  email: string;
  amount: number;
  reference: string;
  callbackUrl: string;
  metadata: Record<string, string>;
}) {
  const response = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
    method: "POST",
    headers: { Authorization: `Bearer ${getSecretKey()}`, "Content-Type": "application/json" },
    body: JSON.stringify({ ...input, amount: input.amount * 100, currency: "GHS" }),
    cache: "no-store",
  });
  const payload = (await response.json()) as { status: boolean; message: string; data?: { authorization_url: string; access_code: string; reference: string } };
  if (!response.ok || !payload.status || !payload.data) throw new Error(payload.message || "Paystack initialization failed.");
  return payload.data;
}

export async function verifyPaystackTransaction(reference: string) {
  const response = await fetch(`${PAYSTACK_API}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${getSecretKey()}` },
    cache: "no-store",
  });
  const payload = (await response.json()) as { status: boolean; message: string; data?: { status: string; reference: string; amount: number; currency: string; gateway_response: string; paid_at?: string } };
  if (!response.ok || !payload.status || !payload.data) throw new Error(payload.message || "Paystack verification failed.");
  return payload.data;
}
