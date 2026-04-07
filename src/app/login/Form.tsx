"use client";
import { loginAction } from "../../server/actions/loginAction/loginAction";
import { useRouter } from "next/navigation";
import React, { useActionState } from "react";
import { Alert, Box, Snackbar, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { signIn } from "next-auth/react";

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

const formatDni = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
};

const formatFile = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits;
};

const Login = () => {
  const router = useRouter();
  const [state, formAction] = useActionState(loginAction, initialState);
  const [dni, setDni] = React.useState("");
  const [file, setFile] = React.useState("");

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
      <TextField
        label="DNI"
        name="dni"
        value={dni}
        onChange={(e) => setDni(formatDni(e.target.value))}
        slotProps={{
          htmlInput: {
            maxLength: 11,
            inputMode: "numeric",
            pattern: "[0-9.]*",
          },
        }}
        required
        error={!state.ok && !!state.message}
      />

      <TextField
        label="Legajo"
        name="file"
        value={file}
        onChange={(e) => setFile(formatFile(e.target.value))}
        slotProps={{
          htmlInput: {
            maxLength: 4,
            inputMode: "numeric",
            pattern: "[0-9]*",
          },
        }}
        required
        error={!state.ok && !!state.message}
      />

      <Button variant="contained" type="submit" disabled={state.ok}>
        Ingresar
      </Button>

      <Button variant="contained" type="button"  onClick={() =>{
         signIn("azure-ad", {callbackUrl:"/admin/users", redirect: true}, {prompt: "none"})}} >
        Ingresar con Outlook
      </Button>
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
