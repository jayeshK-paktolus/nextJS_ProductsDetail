"use client";

import { signIn } from "next-auth/react";
import { FormEvent, FormEventHandler } from "react";

function SubmitButton() {
  return <button type="submit">Sign Up</button>;
}

export default function SignInPage() {
  const submit: FormEventHandler<HTMLFormElement> = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
  };

  return (
    <form onSubmit={submit}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" type="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>

      <SubmitButton />
    </form>
  );
}
