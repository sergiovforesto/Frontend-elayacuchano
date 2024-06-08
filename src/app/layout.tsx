import type { Metadata } from "next";
import "./styles/globals.css";


import { inter } from "../fonts/fonts";
import { AuthenticationProvider } from "@/context/Authentication";

export const metadata: Metadata = {
  title: "El Ayacuchano",
  description: "Noticias de Puerto Ayacucho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-gray-100 ${inter.className}`}>
        <AuthenticationProvider>
          {children}
        </AuthenticationProvider>

      </body>
    </html>
  );
}
