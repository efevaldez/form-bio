"use client";

import BasicSelect from "@/components/Select";
import { submitExcuse } from "@/server/controllers/excuseController";
import { excuse } from "@/utils/const";
import { Button, Grid, styled } from "@mui/material";
import { useState } from "react";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Daypicker from "@/components/Daypicker";


const Report = () => {
  const excusesOptions = Object.entries(excuse).map(([key, value]) => ({
    value: value,
    label: value,
  }));

  const [selectedExcuse, setSelectedExcuse] = useState("");

  const [files, setFiles] = useState<File[]>([]);

  const [loading , setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success'|'error'>('success');


  
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
  const handleSubmit = async () => {
    setLoading(true);
   const result = await submitExcuse({ selectedExcuse })!;
   if (!result) {
  setAlertSeverity("error");
  setAlertMessage("No se pudo enviar el reporte");
} else if (result.success) {
  setAlertSeverity("success");
  setAlertMessage(result.message);
} else {
  setAlertSeverity("error");
  setAlertMessage(result.message);
}
    setLoading(false);
    setOpen(true);
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container flexDirection={"column"} gap={2}>
      <BasicSelect
        label="Motivos"
        options={excusesOptions}
        value={selectedExcuse}
        onChange={setSelectedExcuse}
      />

       <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Cargar archivos
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => {if (event.target.files) {
              setFiles(Array.from(event.target.files));}
        }}
      />
      </Button>

      <Daypicker />
    
    

  

      <Button variant="contained" disabled={loading} onClick={() => handleSubmit()}>
        Enviar
      </Button>
       <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Reporte enviado
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Report;
