import React from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Filipizen - Partners',
  description: 'Filipizen Web',
}

export default function PartnersLayout({children}: {children:React.ReactNode}) {
  return (
    <main>
      {children}
    </main>
  );
}