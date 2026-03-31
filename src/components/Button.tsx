import { Button } from "@mui/material";


export default function Buttons ({children}: {children:React.ReactNode}){ {
    return(
<div>

<Button variant="contained" color="primary" type="submit">
    {children}
      </Button>
      </div>
    )
}}