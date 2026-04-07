'use client';

import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export default function Logout() {
    const logoutAction = async () => {
        document.cookie = 'hash=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        await signOut({ callbackUrl: '/login' });
    }
    return (
        <Button onClick={logoutAction} variant="contained">Cerrar Sesión</Button>
    );
}