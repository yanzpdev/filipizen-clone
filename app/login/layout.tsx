import React from "react"
import { Metadata } from "next"
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Login - Filipizen",
  description: "Log in to your Filipizen Account",
}

export default function LoginLayout({children}: {children:React.ReactNode}) {
  return (
    <main>
      {children}
      <Footer />
    </main>
  );
}