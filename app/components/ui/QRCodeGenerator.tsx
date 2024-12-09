// 'use client';
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import QRCode from "qrcode";
// import io from "socket.io-client";
// import { motion } from "framer-motion";

// const QRCodeGenerator = () => {
//   const [qrCodeUrl, setQRCodeUrl] = useState<string | null>(null);
//   const [isTimedOut, setIsTimedOut] = useState<boolean>(false); 
//   useEffect(() => {
//     const createSocketConnection = () => {
//       const socket = io("http://localhost:5000", {
//         transports: ["websocket"],
//         reconnection: false,
//       });
  
//       socket.on("uuid", (newUUID: string) => {
//         const data = {
//           challenge: newUUID,
//           domain: "www.filipizen.com",
//           credentialQuery: [{ type: "Filipizen" }],
//           service: "/login",
//         };
  
//         try {
//           const qrCodeData = JSON.stringify(data);
//           QRCode.toDataURL(qrCodeData, { errorCorrectionLevel: "H" })
//             .then((url) => setQRCodeUrl(url))
//             .catch((err) => console.error("Error generating QR code", err));
//         } 
        
//         catch (err) {
//           console.error("Error generating QR Code", err);
//         }
//       });
  
//       return socket;
//     };
  
//     let socket = createSocketConnection();  
//     socket.on('auth-success', () => {
//       console.log('Socket disconnected');
//     });
  
//     const interval = setInterval(() => {
//       setQRCodeUrl(null);
//       socket.disconnect();
//       socket = createSocketConnection();
//     }, 120000);
  
//     return () => {
//       clearInterval(interval);
//     //   socket.disconnect();
//     };
//   }, []);

//   return (
//     <>
//       {qrCodeUrl ? 
//         <motion.div
//           key={qrCodeUrl}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Image
//             src={qrCodeUrl}
//             alt={"QR Code"}
//             height={300}
//             width={300}
//             className="mx-auto rounded-lg"
//             priority
//           />
//         </motion.div>
//       :
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Image
//             src={'/assets/roundloading.gif'}
//             alt={"QR Code"}
//             height={300}
//             width={300}
//             className="mx-auto rounded-lg"
//             priority
//           />
//         </motion.div>
//       }
//       {isTimedOut && !qrCodeUrl && 
//         <motion.span 
//           className="text-center text-red-500"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           There was a problem generating the QR code. Please try again.
//         </motion.span>  
//       }
//     </>
//   )
// }

// export default QRCodeGenerator