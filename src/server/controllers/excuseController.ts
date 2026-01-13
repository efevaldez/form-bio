"use server";

import { cookies } from "next/headers";
import { getUserByFile } from "../queries/users";
import nodemailer from "nodemailer";

type SubmitExcuseResult = {
  success: boolean;
  message: string;
};

export async function submitExcuse({
  selectedExcuse,
}: {
  selectedExcuse: string;
}): Promise<SubmitExcuseResult> {
 const hash = (await cookies()).get("hash")?.value;


  if (!hash) {
    return {
      success: false,
      message: "Sesión expirada. Volvé a iniciar sesión.",
    };
  }

  try {
    const user = await getUserByFile(hash);

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: { ciphers: "SSLv3" },
    });

    await transporter.sendMail({
      from: `"Reportes" <${process.env.MAIL_USER}>`,
      to: ["f.valdez@biosidus.com.ar"
      ],
      subject: "Nueva inasistencia recibida",
      html: `
        <h3>¡Hola! Se reportó una nueva ausencia:</h3>
        <p><b>Motivo:</b> ${selectedExcuse}</p>
        <p><b>Colaborador/a:</b> ${user?.name}</p>
        <p><b>N° de Legajo:</b> ${user?.file}</p>
        <p>¡Gracias!</p>
      `,
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
