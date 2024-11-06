"use server";

import backendInstance from "@/lib/backend-instance";
import { HttpStatusCode } from "axios";
import { cache } from "react";

export const account = cache(async () => {
  const response = await backendInstance.get<{
    email: string;
    firstName: string;
    lastName: string;
  }>("/users/me");

  if (response.status !== HttpStatusCode.Ok) {
    throw new Error();
  }

  return {
    email: response.data.email,
    firstName: response.data.firstName,
    lastName: response.data.lastName,
  };
});
