"use client";

import BasicSelect from "@/components/Select";
import { submitExcuse } from "@/server/controllers/excuseController";
import { excuse } from "@/utils/const";
import { Button, Grid, IconButton, styled, Typography } from "@mui/material";
import { useState } from "react";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

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
import Alert from '@mui/material/Alert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Daypicker from "@/components/Daypicker";
import DeleteIcon from '@mui/icons-material/Delete';
import { Dayjs } from "dayjs";


const Report = () => {
  const excusesOptions = Object.values(excuse).map((value) => ({
    value,
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

  // File upload validation constants
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
  const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];
  const MAX_FILES = 3;

  const [fieldErrors, setFieldErrors] = useState({ selectedExcuse: '', date: '', files: '' });

  const validateFields = () => {
    const errors = { selectedExcuse: '', date: '', files: '' };
    let hasError = false;

    if (!selectedExcuse) {
      errors.selectedExcuse = 'Seleccioná un motivo';
      hasError = true;
    }

    if (!date) {
      errors.date = 'Seleccioná una fecha';
      hasError = true;
    }

    if (files.length > MAX_FILES) {
      errors.files = `Máximo ${MAX_FILES} archivos permitidos`;
      hasError = true;
    }

    files.forEach((file) => {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        errors.files = 'Solo se permiten archivos PDF, JPG o PNG';
        hasError = true;
      } else if (file.size > MAX_FILE_SIZE) {
        errors.files = 'Cada archivo debe ser menor de 5 MB';
        hasError = true;
      }
    });

    return { hasError, errors };
  };

  const handleSubmit = async () => {
    const { hasError, errors } = validateFields();

    if (hasError) {
      setFieldErrors(errors);
      setAlertSeverity('error');
      setAlertMessage('Por favor completá los campos requeridos correctamente');
      setOpen(true);
      return;
    }

    setFieldErrors({ selectedExcuse: '', date: '', files: '' });
    setLoading(true);

    const formData = new FormData();
    formData.append("selectedExcuse", selectedExcuse);
    formData.append('date', date ? date.format('DD-MM-YYYY') : '');

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
        error={Boolean(fieldErrors.selectedExcuse)}
        helperText={fieldErrors.selectedExcuse}
      />



      <Daypicker
        value={date}
        onChange={setDate}
        error={Boolean(fieldErrors.date)}
        helperText={fieldErrors.date}
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

              let fileError = '';

              if (selectedFiles.length > MAX_FILES) {
                fileError = `Máximo ${MAX_FILES} archivos permitidos`;
              } else {
                const invalidFile = selectedFiles.find((file) => !ALLOWED_FILE_TYPES.includes(file.type));
                if (invalidFile) {
                  fileError = 'Solo se permiten archivos PDF, JPG o PNG';
                }

                const largeFile = selectedFiles.find((file) => file.size > MAX_FILE_SIZE);
                if (!fileError && largeFile) {
                  fileError = 'Cada archivo debe ser menor de 5 MB';
                }
              }

              if (fileError) {
                setFieldErrors((prev) => ({ ...prev, files: fileError }));
                setAlertSeverity('error');
                setAlertMessage(fileError);
                setOpen(true);
              } else {
                setFiles(selectedFiles);
                setFieldErrors((prev) => ({ ...prev, files: '' }));
                setAlertSeverity('success');
                setAlertMessage(
                  selectedFiles.length === 1
                    ? 'Archivo adjunto correctamente'
                    : `${selectedFiles.length} archivos adjuntos correctamente`
                );
                setOpen(true);
              }
            }
          }}
        />

      </Button>
      {files.length > 0 && (
        <Grid
          sx={{
            border: "1px solid #000",
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



      {fieldErrors.files && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
          {fieldErrors.files}
        </Typography>
      )}

      <Button variant="contained" disabled={loading} onClick={() => handleSubmit()}>
        {loading ? 'Enviando...' : 'Enviar'}
      </Button>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
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
