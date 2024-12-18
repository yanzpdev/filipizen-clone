import React from "react"
import { Metadata } from "next"
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Login - Filipizen",
  description: "Log in to your Filipizen Account",
}

export default function LoginLayout({children}: {children:React.ReactNode}) {
  return (
    <main className="h-screen flex flex-col items-center justify-between">
      {children}
      <Footer />
    </main>
  );
}