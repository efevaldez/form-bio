'use client'
import { useFormState } from 'react-dom';
import { loginAction } from '../action/loginAction/loginAction';
import { useRouter } from 'next/navigation';
import React from 'react';


export type LoginState = {
  ok: boolean,
  message: string,
  hash: string,
  name: string | null
}
const initialState: LoginState = {
  ok: false,
  message: '',
  hash: '',
  name: null,

}


const Login = () => {
  const router = useRouter();
  const [state, formAction] = useFormState(loginAction, initialState);
//@TODO: LOADING
  React.useEffect(() => {
    console.log('state actual:', state)
    if (state.ok && state.name) {
      document.cookie = `hash=${state.hash}`
      router.push(`/`);
    }
  }, [state.ok, state.name, router]);


  return (
    <form action={formAction} className='space-y-4'>
      <div>
        <label>DNI</label>
        <input name='dni'
          type='text'
          inputMode='numeric'
          maxLength={8}
          required
          className='border p-2 w-full'>
        </input>
      </div>

      <div>
        <label>Legajo</label>
        <input name='file'
          type='text'
          inputMode="numeric"
          maxLength={4}
          required
          className='border p-2 w-full'
        />
      </div>

      <button type='submit' className="w-full mt-4 rounded-md bg-black py-2.5 text-white font-semibold
               transition hover:bg-grey-700 active:scale-[0.98]
              focus:outline-none focus:ring-2 focus:ring-grey-500">
        Ingresar
      </button>

      {state.message && (
        <p className={state.ok ? 'text-green-600' : 'text-red-600'}>
          {state.message}
        </p>
      )}

      {state.ok && (
        <p className="font-bold">Bienvenido {state.name}</p>

      )}
    </form>
  )
};

export default Login;