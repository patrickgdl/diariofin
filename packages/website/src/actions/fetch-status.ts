"use server";

import { getStatus } from "@openstatus/react";

export async function fetchStatus() {
  const res = await getStatus("fluxozen");

  const { status } = res;

  return status;
}
