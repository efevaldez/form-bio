"use client";
import { loginAction } from "../../server/actions/loginAction/loginAction";
import { useRouter } from "next/navigation";
import React, { useActionState } from "react";
import { Alert, Box, Snackbar, TextField } from "@mui/material";
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

  React.useEffect(() => {
    console.log("state actual:", state);
    if (state.ok && state.name) {
      document.cookie = `hash=${state.hash}`;
      router.push(`/`);
    }
  }, [state.ok, state.name, router]);

  return (
    <Box
  sx={{
    minHeight: "100vh",
    width: "100vw",
    backgroundImage: "url('/bio1.jpg')",
    backgroundSize: "cover",      
    backgroundPosition: "center", 
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
    <Box
      component={"form"}
      action={formAction}
      gap={2}
      display="flex"
      flexDirection="column"
      sx={{
    width: { xs: "90%", sm: 360 },
    p: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    boxShadow: 6,
  }}
    >
      <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    mb: 2,
  }}
>
      <img
      src="/bio_sidus_logo__1_-removebg-preview.png"
      alt="Logo"
      style={{ height: 100, width: 100 }}
    />
    </Box>
      <TextField label="DNI" name="dni" slotProps={{
    htmlInput: {
      maxLength: 8,
      inputMode: "numeric",
      pattern: "[0-9]*",
    },
  }} required error={!state.ok && !!state.message} />

      <TextField label="Legajo" name="file" slotProps={{
    htmlInput: {
      maxLength: 4,
      inputMode: "numeric",
      pattern: "[0-9]*",
    },
  }} required error={!state.ok && !!state.message} />

      <Button variant="contained" type="submit" disabled={state.ok}>
        Ingresar
      </Button>

      {/* <button type='submit' className="w-full mt-4 rounded-md bg-black py-2.5 text-white font-semibold
               transition hover:bg-grey-700 active:scale-[0.98]
              focus:outline-none focus:ring-2 focus:ring-grey-500">
        Ingresar
      </button> */}

      <Snackbar
        open={!!state.message}
        
        autoHideDuration={2000}
        onClose={() => { }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={state.ok ? "success" : "error"}>
          {state.message}
        </Alert>
      </Snackbar>


    </Box>
    </Box>
  );
};

export default Login;
