"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const file = formData.get("file") as string;
  const dni = formData.get("dni") as string;
  const supervisor = formData.get("supervisor") as string;
  const siteRaw = formData.get("site") as string;

  const site = parseInt(siteRaw, 10);

  if (isNaN(site)) {
    throw new Error("El site debe ser un número válido.");
  }

  if (!name || !file || !dni || !supervisor || !site) {
    throw new Error("Todos los campos son obligatorios.");
  }

  console.log("Datos recibidos:", { name, file, dni, supervisor, site });

  try {
    await sql`
      INSERT INTO "Users" (name, file, dni, supervisor, site)
      VALUES (${name}, ${file}, ${dni}, ${supervisor}, ${site})
    `;

    revalidatePath("/admin/users");
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw new Error("Error al crear el usuario");
  }

  revalidatePath("/admin/users");
}

// "use server";

// import { sql } from "@vercel/postgres";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// export async function createUser(formData: FormData) {
//   const name = formData.get("name") as string;
//   const file = formData.get("file") as string;
//   const dni = formData.get("dni") as string;
//   const supervisor = formData.get("supervisor") as string;
//   const site = formData.get("site") as string;

//   try {
//     await sql`
//       INSERT INTO "Users" (name, file, dni, supervisor, site)
//       VALUES (${name}, ${file}, ${dni}, ${supervisor}, ${site})
//     `;
//   } catch (error) {
//     console.error("Error al crear el usuario", error);
//    throw new Error("Error al crear el usuario");
//   }

// console.log("Datos recibidos:", { name, file, dni, supervisor, site });
//   revalidatePath("/admin/users");
//   redirect("/admin/users");
//}
