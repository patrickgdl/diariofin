"use server";

import { getStatus } from "@openstatus/react";

export async function fetchStatus() {
  const res = await getStatus("diariofin");

  const { status } = res;

  return status;
}
