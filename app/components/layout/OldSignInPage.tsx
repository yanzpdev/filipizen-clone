'use client';
import ContainerComponent from "../ui/ContainerComponent";
import ImageComponent from "../ui/ImageComponent";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Raleway, Roboto } from 'next/font/google';
import { createTheme, ThemeProvider } from "@mui/material/styles"; 
import ButtonComponent from "../ui/ButtonComponent";
import Link from "next/link";
import Footer from "./Footer";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import QRCode from "qrcode";
import io from "socket.io-client";  // Import socket.io-client
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const raleway = Raleway({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'] 
});

const roboto = Roboto({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'] 
});

export let theme = createTheme({
  typography: {
    fontFamily: raleway.style.fontFamily,
  }
})

export let theme2 = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  }
})


const SignInPage = () => {
  const [qrCodeUrl, setQRCodeUrl] = useState<string | null>(null);
  const [isTimedOut, setIsTimedOut] = useState<boolean>(false); 
  const router = useRouter();

  useEffect(() => {
    // const clientId = localStorage.getItem("clientId") || crypto.randomUUID();
    // localStorage.setItem("clientId", clientId);

    const createSocketConnection = () => {
      const socket = io(process.env.NEXT_PUBLIC_SERVER_URL + ':5000', {
        transports: ["websocket"],
        reconnection: true,
        // query: { clientId },
      });

      socket.on("request-token", (sessionToken: string ) => {
        try {
          const qrCodeData = JSON.stringify({ sessionToken, clientId: "test" });
          QRCode.toDataURL(qrCodeData, { errorCorrectionLevel: "H" })
            .then((url) => setQRCodeUrl(url))
            .catch((err) => console.error("Error generating QR code", err));
        }
        
        catch (err) {
          console.error("Error generating QR Code", err);
        }
      });

      socket.on("auth-success", () => {
        console.log("auth success!");
        router.push("/home");  
      });

      socket.on("auth-fail", () => {
        console.log("auth failed!");  
      });
  
      return socket;
    };
  
    let socket = createSocketConnection();
  
    const interval = setInterval(() => {
      setQRCodeUrl(null);
      socket.disconnect();
      socket = createSocketConnection();
    }, 25000);
  
    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <ContainerComponent
        className={`h-[84.3vh] w-full relative text-slate-700`}
        classes={{}}
        fixed={false}
        disableGutters={true}
      >
        <div 
          className={`mt-20 flex items-center justify-center gap-2`}
        >
          <Link href='/'>
            <Image
              src={`/assets/filipizen.svg`} 
              alt={`Filipizen Logo`} 
              width={250} 
              height={250} 
              priority
              className="w-auto h-[70px]"
            />
          </Link>
        </div>
        <ThemeProvider theme={theme}>
          <span 
            className={`pt-6 flex items-center justify-center`}
          >
            <FormControl className="w-full">
              {qrCodeUrl ? 
                <motion.div
                  key={qrCodeUrl}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={qrCodeUrl}
                    alt={"QR Code"}
                    height={300}
                    width={300}
                    className="mx-auto rounded-lg"
                    priority
                  />
                </motion.div>
              :
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={'/assets/roundloading.gif'}
                    alt={"QR Code"}
                    height={300}
                    width={300}
                    className="mx-auto rounded-lg"
                    priority
                  />
                </motion.div>
              }

              {isTimedOut && !qrCodeUrl && 
                <motion.span 
                  className="text-center text-red-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  There was a problem generating the QR code. Please try again.
                </motion.span>  
              }

              <Typography 
                variant='body1' 
                className="mt-6 text-sm font-medium leading-none flex flex-col gap-2 items-center justify-center"
                align='center'
              >
                <span>Use the Filipizen App to log in via QR code</span>
                <span className="flex gap-4">
                  <Link
                    className=""
                    href="https://play.google.com/store/apps"
                    target="_blank"
                  >
                    <ImageComponent 
                      src={"/assets/googleplay.svg"} 
                      alt={"Google Play"} 
                      width={120}
                      height={100}
                      className="w-auto h-[40px]"

                    />
                  </Link>
                  
                  <Link
                    className=""
                    href="https://www.apple.com/ph/app-store/"
                    target="_blank"
                  >
                    <ImageComponent 
                      src={"/assets/appstore.svg"} 
                      alt={"App Store"} 
                      width={120}
                      height={100}
                      className="w-auto h-[40px]"

                    />
                  </Link>
                </span>
              </Typography>
              <span className="mt-3 mx-auto text-center items-center justify-center flex gap-2">
                <ButtonComponent
                  variant="text"
                  href="/"
                  className="hover:bg-transparent hover:underline text-slate-700"
                >
                  Terms of Service
                </ButtonComponent>
                |
                <ButtonComponent
                  variant="text"
                  href="/"
                  className="hover:bg-transparent hover:underline text-slate-700"
                >
                  Privacy Policy
                </ButtonComponent>
              </span>
            </FormControl>        
          </span>
        </ThemeProvider>
      </ContainerComponent>
      <Footer />
    </>
  )
}

export default SignInPage;