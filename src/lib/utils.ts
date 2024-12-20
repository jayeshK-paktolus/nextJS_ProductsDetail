import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { EstimatePasswordStrength } from "./enums/estimate-password-strength.enum";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.BASE_URL) return `https://${process.env.BASE_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const estimatePasswordStrength = (password: string) => {
  const regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*])(?=.*[^\s]).{8,}$/;
  let score = 0;

  if (password.length === 0) return EstimatePasswordStrength.VeryWeak;
  if (regex.test(password)) return EstimatePasswordStrength.Strong;
  if (password.length >= 8) score++;
  if (/\d/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[@#$%^&+=!*]/.test(password)) score++;
  if (!/\s/.test(password)) score++;

  if (score >= 5) {
    return EstimatePasswordStrength.Medium;
  } else if (score >= 3) {
    return EstimatePasswordStrength.Weak;
  } else {
    return EstimatePasswordStrength.VeryWeak;
  }
};
