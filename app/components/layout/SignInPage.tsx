'use client';
import ContainerComponent from "../ui/ContainerComponent";
import ImageComponent from "../ui/ImageComponent";
import { FormControl, Typography } from "@mui/material";
import { Raleway, Roboto } from 'next/font/google';
import { createTheme, ThemeProvider } from "@mui/material/styles"; 
import ButtonComponent from "../ui/ButtonComponent";
import Link from "next/link";
import Footer from "./Footer";
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from "next/navigation";
import QRCodeComponent from "./QRCodeComponent";
import { initializeSocket } from "@/app/utils/socket";
import { generateId, generateQRCode } from "@/app/utils/apiUtils";
import { Socket } from "socket.io-client";

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
  const [isTimedOut, setIsTimedOut] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const router = useRouter();

  let socket: any;
  
  useEffect(() => {
    const handleSocketMessage = (message: any) => {

      console.log("Message: ", message);
      setTimeout(() => {
        // socketRef.current?.disconnect();
        // socketRef.current = null;
      }, 1000);
      router.push('/home');
    };

    const rebuild = async () => {
      try {
        const uuid = await generateId();
        const qrUrl = await generateQRCode(uuid);
        setQRCodeUrl(qrUrl);

        // Ensure any existing socket is disconnected
        // if (socketRef.current) {
        //   socketRef.current.disconnect();
        //   socketRef.current = null;
        // }

        // Initialize a new socket
        socketRef.current = initializeSocket(uuid.id, handleSocketMessage);
      } 
      
      catch (error) {
        console.error(error);
        setIsTimedOut(true);
      }
    };

    rebuild();
    const intervalId = setInterval(rebuild, 300000);

    return () => {
      clearInterval(intervalId);
      // if (socketRef.current) {
      //   socketRef.current.disconnect();
      //   socketRef.current = null;
      // }
    };
  }, [router, socket]);

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
              <QRCodeComponent qrCodeUrl={qrCodeUrl} isTimedOut={isTimedOut} />

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