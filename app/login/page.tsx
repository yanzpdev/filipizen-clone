/* eslint-disable @next/next/no-img-element */
"use client";
import { Container, FormControl } from "@mui/material";
import { Raleway, Roboto } from "next/font/google";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import QRCodeComponent from "../../components/ui/QRCodeComponent";
import { initializeSocket } from "@/utils/socket";
import { generateId, generateQRCode } from "@/utils/apiUtils";
import { Socket } from "socket.io-client";
import Panel from "@/components/io/Panel";
import { motion } from "framer-motion";
import Button from "@/components/io/Button";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const LoginPage = () => {
  const [qrCodeUrl, setQRCodeUrl] = useState<string | null>(null);
  const [uuid, setUuid] = useState<string>();
  const [isTimedOut, setIsTimedOut] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const [time, setTime] = useState<number>(300);
  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter();

  // const socket = io('192.168.2.111:5000');

  // let socket: any;

  // console.log("Let socket ==>", socket);

  // useEffect(() => {
  //   console.log("REF ===>", socketRef);
  //   const handleSocketMessage = (message: any) => {
  //     console.log("Message: ", message);
  //     // setTimeout(() => {
  //     console.log("useState Socket ===>", socket);

  //     // }, 1000);
  //     socket.disconnect();
  //     router.push('/home');
  //   };

  //   const rebuild = async () => {
  //     try {
  //       const uuid = await generateId();
  //       const qrUrl = await generateQRCode(uuid);
  //       setQRCodeUrl(qrUrl);
  //       setTime(300)

  //     const socket = socketRef.current = initializeSocket(uuid.id, handleSocketMessage);
  //     setSocket(socket)
  //       console.log("Socket ===>", socket)
  //     }

  //     catch (error) {
  //       console.error(error);
  //       setIsTimedOut(true);
  //     }
  //   };

  //   rebuild();
  //   const intervalId = setInterval(rebuild, 300000);

  //   return () => {
  //     clearInterval(intervalId);
  //     if (socketRef.current) {
  //       socketRef.current.disconnect();
  //       socketRef.current = null;
  //     }
  //   };
  // }, [router]);



    // useEffect(() => {
  //   const rebuild = async () => {
  //     const generatedUuid = await generateId();
  //     const qrUrl = await generateQRCode(generatedUuid);
  //     setUuid(generatedUuid.id);
  //     setQRCodeUrl(qrUrl);
  //   };

  //   rebuild();
  //   const intervalId = setInterval(rebuild, 300000);

  //   return () => {
  //     clearInterval(intervalId);
  //     socket.disconnect();
  //   };

  // }, [router])

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("connected to server");
  //     console.log(uuid);
  //   })

  //   socket.on("message", (challenge: string, message: string) => {
  //     console.log("Received challenge:", challenge);
  //     console.log("Received message:", message);
  //   });
  // }, [uuid])

  const handleMessage = (message: string ) => {
    if (message !== null) {
      socket?.disconnect();
      router.push('/home');
    }
  }

  const handleSocketMessage = async () => {
    const uuid = await generateId();
    const qrUrl = await generateQRCode(uuid);
    setQRCodeUrl(qrUrl);
    setTime(300);

    const socket = (socketRef.current = initializeSocket(
      uuid.id,
      handleMessage
    ));
    setSocket(socket);
   
  };

  useEffect(() => {
    handleSocketMessage();
  }, [router]);

  useEffect(() => {
    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <Container
      className={`h-[84.3vh] w-full relative text-slate-700`}
      classes={{}}
      fixed={false}
      disableGutters={true}
    >
      <Panel className={`mt-20 flex items-center justify-center gap-2`}>
        <Link href="/">
          <Image
            src={`/assets/filipizen.svg`}
            alt={`Filipizen Logo`}
            width={250}
            height={250}
            priority
            className="w-auto h-[70px]"
          />
        </Link>
      </Panel>

      <Panel className={`pt-6 flex items-center justify-center font-semibold ${raleway.className}`}>
        <FormControl className="w-full">
          <QRCodeComponent qrCodeUrl={qrCodeUrl} isTimedOut={isTimedOut} />
            {qrCodeUrl ?
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }} 
                className="text-center mt-2">{formatTime(time)}
              </motion.div>
            :
              <Panel className="opacity-0 pointer-events-none text-center mt-2">x</Panel>
            }
          <Panel
            className="mt-6 text-sm font-medium leading-none flex flex-col gap-2 items-center justify-center"
          >
            <Panel>Use the Filipizen App to log in via QR code</Panel>
            <Panel className="flex gap-4">
              <a
                className=""
                href="https://play.google.com/store/apps"
                target="_blank"
              >
                {/* <Image
                  src={"/assets/googleplay.svg"}
                  alt={"Google Play"}
                  width={120}
                  height={100}
                  className="w-auto h-[40px]"
                /> */}
                <img src="/assets/googleplay.svg" alt="Google Play" width={120} height={120}  className="w-auto h-[40px]"/>
              </a>
              <a
                className=""
                href="https://www.apple.com/ph/app-store/"
                target="_blank"
              >
                {/* <Image
                  src={"/assets/appstore.svg"}
                  alt={"App Store"}
                  width={120}
                  height={100}
                  className="w-auto h-[40px]"
                /> */}
                <img src="/assets/appstore.svg" alt="App Store" width={120} height={100}  className="w-auto h-[40px]"/>
              </a>
            </Panel>
          </Panel>
          <Panel className="mt-3 mx-auto text-center items-center justify-center flex gap-2">
            <Button
              variant="text"
              href="/"
              className="hover:bg-transparent hover:underline text-slate-700"
            >
              Terms of Service
            </Button>
            |
            <Button
              variant="text"
              href="/"
              className="hover:bg-transparent hover:underline text-slate-700"
            >
              Privacy Policy
            </Button>
          </Panel>
        </FormControl>
      </Panel>
    </Container>
  );
};

export default LoginPage;
