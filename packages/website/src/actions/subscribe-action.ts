"use server";

import { headers } from "next/headers";

export async function subscribeAction(formData: FormData, userGroup: string) {
  const email = formData.get("email") as string;
  const country = headers().get("x-vercel-ip-country") || "SE";

  const res = await fetch("", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      userGroup,
      country,
    }),
  });

  const json = await res.json();

  return json;
}
