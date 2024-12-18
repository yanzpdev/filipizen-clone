import React from "react";

export default async function PartnerLinkDataLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='h-fit w-full relative'>
      {children}
    </main>
  );
}
