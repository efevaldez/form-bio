"use server";

import { cookies } from "next/headers";
import { getUserByFile } from "../queries/users";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";

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

   const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls:{
          ciphers:'SSLv3'
      }
    });
  console.log('enviando mail????')
  
     const result =await transporter.sendMail({
      from: `"Reportes" <${process.env.MAIL_USER}>`,
      to: [
        "f.valdez@biosidus.com.ar"
      ],
      subject: "Nueva inasistencia recibida",
      html: `
        <h3>Inasistencia:</h3>
        <p><b>Motivo:</b> ${selectedExcuse}</p>
      `,
    });
   
    console.log(result);
}
