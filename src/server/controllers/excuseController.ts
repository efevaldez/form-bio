"use server";

import { cookies } from "next/headers";
import { getUserByFile } from "../queries/users";
import { redirect } from "next/navigation";

export async function submitExcuse({
  selectedExcuse,
}: {
  selectedExcuse: string;
}) {
  const hash = (await cookies()).get("hash")?.value;
  if (!hash) return redirect("/login");
  const user = await getUserByFile(hash);
  console.log(hash);
  console.log(selectedExcuse);
  console.log(user);
}
