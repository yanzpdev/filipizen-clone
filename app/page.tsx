import { Metadata } from "next";
import Footer from "./components/layout/Footer";
import { Raleway, Roboto } from "next/font/google";
import HomeComponent from "./components/layout/HomeComponent";
import { getMembersData } from "./utils/CloudPartnerService";

export const metadata: Metadata = {
  title: "Welcome - Filipizen",
  description: "Generated by create next app",
}

const roboto = Roboto({ 
  weight: ["400", '500', '700'], 
  subsets: ["latin"]  
});

const raleway = Raleway({ 
  weight: ["400", '500', '700'], 
  subsets: ["latin"],  
  display: 'swap'
});

export default async function Home() {
  const memberData = await getMembersData();
  
  return (
    <main className={`relative flex min-h-screen flex-col items-center justify-between ${raleway.className}`}>
      <HomeComponent memberData={memberData} />
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </main>
  );
}
