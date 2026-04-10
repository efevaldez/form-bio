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

  if (!hash) {
    return {
      success: false,
      message: "Sesión expirada. Volvé a iniciar sesión.",
    };
  }


  const selectedExcuse = formData.get("selectedExcuse") as string;

  try {
    const user = await getUserByFile(hash);

    console.log(user);
    console.log('rrhh', user?.siteResponsibleEmail);
    console.log('supervisor', user?.supervisoremail);

    const recipients = [
      user?.supervisoremail,
     ...user?.siteResponsibleEmail || [],
    ]
    console.log('Mail enviado a:', recipients)

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
      to: [`${recipients}`],
      subject: "Nueva inasistencia recibida",
      html: `
        <h3>¡Hola! Se reportó una nueva ausencia:</h3>
        <p><b>Motivo:</b> ${selectedExcuse}</p>
        <p><b>Colaborador/a:</b> ${user?.name}</p>
        <p><b>N° de Legajo:</b> ${user?.file}</p>
        <p><b>Fecha de ausencia:</b> ${formData.get('date')}</p>
       
        <p>¡Gracias!</p>
      `,
    });

    return {
      success: true,
      message: `Reporte enviado correctamente. 
    Estimado/a: Le recordamos que este canal tiene como única finalidad la notificación de ausencias y/o llegadas tarde.
     Por favor, recuerde subir el justificativo o constancia a la plataforma TuRecibo.com
¡Muchas gracias!`
    };
  } catch (error) {
    console.error("Error al enviar el reporte:", error);

    return {
      success: false,
      message: "Ocurrió un error al enviar el reporte",
    };
  }
}
