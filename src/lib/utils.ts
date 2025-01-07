import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.BASE_URL) return `https://${process.env.BASE_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function encryptData(param: Record<string, string>): string {
  if (!param || !process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY) return "";

  const paramString = JSON.stringify(param);

  const IV = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY, "utf-8"),
    IV
  );

  let encrypted = cipher.update(paramString, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return `${IV.toString("hex")}:${encrypted}`;
}

export function decryptData(encryptedParam: string): string {
  if (!encryptedParam || !process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY) return "";

  const [ivHex, encrypted] = encryptedParam.split(":");
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY, "utf-8"),
    iv
  );

  let decrypted = decipher.update(encrypted, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted;
}
