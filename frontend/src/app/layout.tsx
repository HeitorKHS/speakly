import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Projeto escola",
  description: "Plataforma para agendar aulas",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="pt-BR">
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );

}
