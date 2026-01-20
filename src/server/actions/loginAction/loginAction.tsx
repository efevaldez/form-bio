"use server";

import { LoginState } from "@/app/login/Form";
import { getUserByFileAndDni } from "@/server/queries/users";

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
      message: "El DNI y el legajo no coinciden",
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
