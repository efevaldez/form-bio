"use server";

import { LoginState } from "@/app/login/Form";
import { getUserByFileAndDni } from "@/server/queries/users";

export async function loginAction(_state: LoginState, formData: FormData): Promise<LoginState> {
  const dniInput = (formData.get("dni") as string | null) ?? "";
  const fileInput = (formData.get("file") as string | null) ?? "";

  const dni = dniInput.replace(/\D/g, "");
  const file = fileInput.replace(/\D/g, "");

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
