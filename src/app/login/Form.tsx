"use client";
import { loginAction } from "../../server/actions/loginAction/loginAction";
import { useRouter } from "next/navigation";
import React, { useActionState } from "react";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";

export type LoginState = {
  ok: boolean;
  message: string;
  hash: string;
  name: string | null;
};
const initialState: LoginState = {
  ok: false,
  message: "",
  hash: "",
  name: null,
};

const Login = () => {
  const router = useRouter();
  const [state, formAction] = useActionState(loginAction, initialState);
  //@TODO: LOADING
  React.useEffect(() => {
    console.log("state actual:", state);
    if (state.ok && state.name) {
      document.cookie = `hash=${state.hash}`;
      router.push(`/`);
    }
  }, [state.ok, state.name, router]);

  return (
    <Box
      component={"form"}
      action={formAction}
      gap={2}
      display="flex"
      flexDirection="column"
    >
      <TextField label="DNI" name="dni" required />

      <TextField label="Legajo" name="file" required />

      <Button variant="contained" type="submit">
        Ingresar
      </Button>

      {/* <button type='submit' className="w-full mt-4 rounded-md bg-black py-2.5 text-white font-semibold
               transition hover:bg-grey-700 active:scale-[0.98]
              focus:outline-none focus:ring-2 focus:ring-grey-500">
        Ingresar
      </button> */}

      {state.message && (
        <p className={state.ok ? "text-green-600" : "text-red-600"}>
          {state.message}
        </p>
      )}

      {state.ok && <p className="font-bold">Bienvenido {state.name}</p>}
    </Box>
  );
};

export default Login;
