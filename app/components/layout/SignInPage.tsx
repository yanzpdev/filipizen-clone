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
import io from "socket.io-client"; 
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
    const generateId = async () => {
      try {
        const res = await fetch(`/api/generate-id?${Date.now.toString()}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }

        const id = await res.json();
        console.log("Generated ID:", id);
        return id;
      } 
      
      catch (error) {
        console.error('Error fetching or generating QR code:', error);
      }
    };


    const generateQRCode = async (challenge: any) => {
      const payload = {
        "challenge": challenge.id,
        "domain": "www.filipizen.com", // change to ip address 
        "credentialQuery": [
          {
            "type": "Filipizen",   
          },
        ],
        
        "service": "/authenticate", 
      };


      const qrCodeData = JSON.stringify(payload);
      console.log(qrCodeData);

      const qrCodeUrl = await QRCode.toDataURL(qrCodeData, {
        errorCorrectionLevel: 'H',
      });
      setQRCodeUrl(qrCodeUrl);
    }

    let socket: any;
    
    const connectSocket = async (uuid: { id: string }) => {
      socket = io('http://localhost:5000', {
        query: { uuid: uuid.id }
      });

      socket.on('connect', () => {
        console.log("connected");
        console.log("sent to join: ", uuid.id);
        socket.emit("join", uuid.id); 
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      })

      socket.on('error', (errMsg: any) => {
        console.log("error", errMsg);
      })

      socket.on("message", (message: any) => {
        console.log("Received message: ", message);
        
        // message = token /session id
        console.log("Session ID: ", message);

        setTimeout(() => {
          socket.disconnect();
          router.push('/home');
        }, 1000);
      })
    }

    const rebuild = async () => {
      const uuid = await generateId();
      generateQRCode(uuid);
      connectSocket(uuid);
    }
    
    rebuild();

    const intervalId = setInterval(async () => {
      setQRCodeUrl(null); 
      await rebuild();
    }, 300000); 

    return () => clearInterval(intervalId);
  }, [router]); 

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
              {qrCodeUrl != null ? 
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