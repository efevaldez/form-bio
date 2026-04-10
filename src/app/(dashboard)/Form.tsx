"use client";

import BasicSelect from "@/components/Select";
import { submitExcuse } from "@/server/controllers/excuseController";
import { excuse } from "@/utils/const";
import { Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Daypicker from "@/components/Daypicker";
import { Dayjs } from "dayjs";

const Report = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const excusesOptions = Object.values(excuse).map((value) => ({
    value,
    label: value,
  }));

  //excuses
  const [selectedExcuse, setSelectedExcuse] = useState("");


  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  

  //Daypicker
  const [date, setDate] = useState<Dayjs | null>(null);


  const [fieldErrors, setFieldErrors] = useState({ selectedExcuse: '', date: '' });

  const validateFields = () => {
    const errors = { selectedExcuse: '', date: '' };
    let hasError = false;

    if (!selectedExcuse) {
      errors.selectedExcuse = 'Seleccioná un motivo';
      hasError = true;
    }

    if (!date) {
      errors.date = 'Seleccioná una fecha';
      hasError = true;
    }

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

    setFieldErrors({ selectedExcuse: '', date: '' });
    setLoading(true);

    const formData = new FormData();
    formData.append("selectedExcuse", selectedExcuse);
    formData.append('date', date ? date.format('DD-MM-YYYY') : '');

    const result = await submitExcuse(formData);
    if (result.success) {
      setAlertSeverity('success');
    } else {
      setAlertSeverity('error')
    }
    setAlertMessage(result.message)
    setLoading(false);
    setOpen(true);

    if(result.success){
      setSelectedExcuse('');
      setDate(null);
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
    <Grid container flexDirection={"column"} gap={{ xs: 1.5, sm: 2 }} sx={{ maxWidth: '100%' }}>
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
        variant="contained"
        disabled={loading}
        onClick={() => handleSubmit()}
        fullWidth={isMobile}
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </Button>

      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={alertSeverity}
          variant="filled"
          sx={{ width: '100%',
            whiteSpace: 'pre-line',
            textAlign: 'center'
           }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Report;
