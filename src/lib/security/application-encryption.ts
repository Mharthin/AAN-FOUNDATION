import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const algorithm = "aes-256-gcm";

function getKey() {
  const value = process.env.APPLICATION_ENCRYPTION_KEY;
  if (!value || !/^[0-9a-f]{64}$/i.test(value)) {
    throw new Error("APPLICATION_ENCRYPTION_KEY must be a 32-byte hexadecimal value.");
  }
  return Buffer.from(value, "hex");
}

export function encryptApplicationResponses(value: unknown) {
  const iv = randomBytes(12);
  const cipher = createCipheriv(algorithm, getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(value), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv, tag, encrypted].map((part) => part.toString("base64url")).join(".");
}

export function decryptApplicationResponses<T>(value: string): T {
  const [ivValue, tagValue, encryptedValue] = value.split(".");
  if (!ivValue || !tagValue || !encryptedValue) throw new Error("Invalid encrypted application payload.");
  const decipher = createDecipheriv(algorithm, getKey(), Buffer.from(ivValue, "base64url"));
  decipher.setAuthTag(Buffer.from(tagValue, "base64url"));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedValue, "base64url")), decipher.final()]);
  return JSON.parse(decrypted.toString("utf8")) as T;
}
