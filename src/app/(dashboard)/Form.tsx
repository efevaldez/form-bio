"use client";

import BasicSelect from "@/components/Select";
import { submitExcuse } from "@/server/controllers/excuseController";
import { excuse } from "@/utils/const";
import { Button, Grid, IconButton, styled } from "@mui/material";
import { useState } from "react";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Daypicker from "@/components/Daypicker";
import DeleteIcon from '@mui/icons-material/Delete';
import { Dayjs } from "dayjs";


const Report = () => {
  const excusesOptions = Object.entries(excuse).map(([key, value]) => ({
    value: value,
    label: value,
  }));

  const [selectedExcuse, setSelectedExcuse] = useState("");

  //file upload
  const [files, setFiles] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  //Daypicker
  const [date, setDate] = useState<Dayjs | null>(null);



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
    if (!date) {
      setAlertSeverity("error");
      setAlertMessage("Seleccioná una fecha");
      setOpen(true);
      return;
    }

    if (!selectedExcuse) {
      setAlertSeverity("error");
      setAlertMessage("Seleccioná un motivo");
      setOpen(true);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("selectedExcuse", selectedExcuse);
    formData.append('date', date.format('DD-MM-YYYY'));

    files.forEach((file) => {
      formData.append("files", file);
    })
    const result = await submitExcuse(formData);
    if (result.success) {
      setAlertSeverity('success');
    } else {
      setAlertSeverity('error')
    }
    //    if (!result) {
    //   setAlertSeverity("error");
    //   setAlertMessage("No se pudo enviar el reporte");
    // } else if (result.success) {
    //   setAlertSeverity("success");
    //   setAlertMessage(result.message);
    // } else {
    //   setAlertSeverity("error");
    //   setAlertMessage(result.message);
    // }
    setAlertMessage(result.message)
    setLoading(false);
    setOpen(true);

    if(result.success){
      setSelectedExcuse('');
      setDate(null);
      setFiles([]);
    }else{
      setAlertSeverity('error')
    }
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



      <Daypicker
        value={date}
        onChange={setDate}
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
          accept=".pdf,.jpg,.png"
          multiple
          disabled={loading}
          onChange={(event) => {
            if (event.target.files) {
              const selectedFiles = Array.from(event.target.files);
              setFiles(selectedFiles);

              setAlertSeverity('success');
              setAlertMessage(
                selectedFiles.length === 1
                  ? 'Archivo adjunto correctamente'
                  : `${selectedFiles.length}`
              );
              setOpen(true);
            }
          }}
        />

      </Button>
      {files.length > 0 && (
        <Grid
          sx={{
            border: "1px solid #4caf50",
            borderRadius: 1,
            padding: 2,
          }}
        >
          <strong>Archivo adjunto:</strong>

          {files.map((file, index) => (
            <Grid
              key={index}
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 1 }}
            >
              <span>{file.name}</span>

              <IconButton aria-label="delete" color="error"
                onClick={() =>
                  setFiles((prev) => prev.filter((_, i) => i !== index))
                }>
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      )}






      <Button variant="contained" disabled={loading} onClick={() => handleSubmit()}>
        {loading ? 'Enviando...' : 'Enviar'}
      </Button>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Report;
