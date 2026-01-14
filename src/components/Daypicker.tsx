import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type DaypickerProps = {
  value: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
};

export default function Daypicker({ value, onChange }: DaypickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Ingresá la fecha de tu ausencia"
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
}









// import react, { useState } from 'react';
// import dayjs , { Dayjs } from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';


// export default function ResponsiveDatePickers() {
//     const [ date, setDate ] = useState<Dayjs | null>(dayjs('2026-01-05'));
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer
//         components={[
//           'DatePicker'
//         ]}
//       >
//         <DemoItem label="Ingresá la fecha de tu ausencia:">
//           <DatePicker value={date} 
//           onChange={(newValue: Dayjs | null) => setDate(newValue)} />
//         </DemoItem>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }
