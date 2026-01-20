"use server";

import { cookies } from "next/headers";
import { getUserByFile } from "../queries/users";
import nodemailer from "nodemailer";

type SubmitExcuseResult = {
  success: boolean;
  message: string;
};

export async function submitExcuse(
 formData: FormData
): Promise<SubmitExcuseResult> {
  const hash = (await cookies()).get("hash")?.value;
  
//   {
//   selectedExcuse,
// }: {
//   selectedExcuse: string;
// }): Promise<SubmitExcuseResult> {
//  const hash = (await cookies()).get("hash")?.value;


  if (!hash) {
    return {
      success: false,
      message: "Sesión expirada. Volvé a iniciar sesión.",
    };
  }
  const selectedExcuse = formData.get("selectedExcuse") as string;
  const files = formData.getAll("files") as File[];

   const attachments = await Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
    if (buffer.length > 2_000_000) throw new Error("Archivo demasiado grande");
        return{
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type,
        }
    }))
  ;


  try {
    const user = await getUserByFile(hash);

    // prueba
    const supervisor = await getUserByFile(hash)

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      });

    await transporter.sendMail({
      from: `${process.env.MAIL_USER}`,
      to: [`${supervisor?.email}`, "f.valdez@biosidus.com.ar",],
      subject: "Nueva inasistencia recibida",
      html: `
        <h3>¡Hola! Se reportó una nueva ausencia:</h3>
        <p><b>Motivo:</b> ${selectedExcuse}</p>
        <p><b>Colaborador/a:</b> ${user?.name}</p>
        <p><b>N° de Legajo:</b> ${user?.file}</p>
        <p><b>Fecha de ausencia:</b> ${formData.get('date')}</p>
       
        <p>¡Gracias!</p>
      `,
      attachments
    });

    return {
      success: true,
      message: "Reporte enviado correctamente",
    };
  } catch (error) {
    console.error("Error al enviar el reporte:", error);

    return {
      success: false,
      message: "Ocurrió un error al enviar el reporte",
    };
  }
}
