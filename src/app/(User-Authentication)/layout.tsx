import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "El Ayacuchano - Autenticación",
    description: "Ingresa / Registrate en el ayacuchano",
};

export default function AuthLayout({ children }: { children: React.ReactNode; }) {


    return (
        <div>
            {children}
        </div>
    );
}