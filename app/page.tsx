import { Metadata } from "next";
import Footer from "./components/layout/Footer";
import { Roboto } from "next/font/google";
import HomeComponent from "./components/layout/HomeComponent";
import { getMembersData } from "./utils/helpers";

export const metadata: Metadata = {
  title: "Welcome - Filipizen",
  description: "Generated by create next app",
}

const roboto = Roboto({ 
  weight: ["400", '500', '700'], 
  subsets: ["latin"]  
});

export default async function Home() {
  const memberData = await getMembersData();
  return (
    <main className={`relative flex min-h-screen flex-col items-center justify-between ${roboto.className}`}>
      <HomeComponent memberData={memberData} />
      <Footer />
    </main>
  );
}
