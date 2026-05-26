"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function deleteUser(file: string) {
  try {
    const supervisorCountResult = await sql`
      SELECT COUNT(*) AS count
      FROM "Users"
      WHERE supervisor = ${file}
    `;
    const supervisorCount = Number(supervisorCountResult.rows[0]?.count ?? 0);

    if (supervisorCount > 0) {
      throw new Error(
        "No se puede eliminar este usuario porque es supervisor/a de otros usuarios. Modificá primero a sus supervisados."
      );
    }

    const responsibleCountResult = await sql`
      SELECT COUNT(*) AS count
      FROM "SiteResponsible"
      WHERE responsible = ${file}
    `;
    const responsibleCount = Number(responsibleCountResult.rows[0]?.count ?? 0);

    if (responsibleCount > 0) {
      throw new Error(
        "No se puede eliminar este usuario porque está asignado como responsable de sitio. Cambia o elimina primero esas asignaciones."
      );
    }

    await sql`DELETE FROM "Users" WHERE file = ${file}`;
    revalidatePath("/admin/users");
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    if (error instanceof Error && error.message.startsWith("No se puede eliminar este usuario")) {
      throw error;
    }
    throw new Error("Error al eliminar el usuario");
  }
}