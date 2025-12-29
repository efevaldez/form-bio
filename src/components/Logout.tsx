'use client';

export default function Logout() {
    const logoutAction = () => {
        document.cookie = 'hash=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        window.location.href = '/login';    
    }
    return (
            <button onClick={logoutAction}>Logout</button>
    );
}