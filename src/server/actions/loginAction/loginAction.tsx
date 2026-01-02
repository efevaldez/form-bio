"use server";

import { LoginState } from "@/app/login/Form";
import { getUserByFileAndDni } from "@/server/queries/users";
import { sql } from "@vercel/postgres";

export async function loginAction(
  _state: LoginState,
  formData: FormData
): Promise<LoginState> {
  const dni = formData.get("dni") as string;
  const file = formData.get("file") as string;

  if (!dni || !file) {
    return { ok: false, message: "Datos incorrectos", name: null, hash: "" };
  }

  const user = await getUserByFileAndDni(file, dni);

  if (!user) {
    return {
      ok: false,
      message: "DNI o legajo incorrectos",
      name: null,
      hash: "",
    };
  }

  return {
    ok: true,
    name: user.name,
    hash: file,
    message: "",
  };
}
