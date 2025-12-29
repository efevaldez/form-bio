'use server';

import { LoginState } from '@/app/login/Form';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';





export async function loginAction(
  _state: LoginState,
  formData: FormData
): Promise <LoginState> 
{
  const dni = formData.get('dni') as string;
  const file = formData.get('file') as string;

  if (!dni || !file) {
    return { ok: false, message: 'Datos incorrectos', name: null, hash: '' };
  }

  const result = await sql`
    SELECT name
    FROM "Users"
    WHERE dni = ${dni}
    AND file = ${file}
    LIMIT 1
  `;

  if (result.rowCount === 0) {
    return { ok: false, message: 'DNI o legajo incorrectos', name: null, hash:'' };
  }

    return {
    ok: true,
    name: result.rows[0].name,
    hash: file,
    message: ''
  };



}

