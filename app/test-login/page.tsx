'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import jsQR from 'jsqr';

export default function Home() {
  const [qrCode, setQrCode] = useState<File | null>(null);
  const [payload, setPayload] = useState<any>();
  const [authStatus, setAuthStatus] = useState<string | null>(null);
  let socket: any;

  useEffect(() => {
    if (payload) {
      
      const data = JSON.parse(payload)
      console.log(data);

      if (socket) {
        socket.disconnect();
      }

      socket = io('http://localhost:5000', {
        query: { uuid: data.challenge.id }
      });
  
      socket.on('connect', () => {

        console.log("connected");
        socket.on("message", (message: any) => {
          console.log(message.message);
        })

        socket.on("no-client", (message: any) => {
          console.log(message.message);
        })
      });
    }
  }, [payload]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setQrCode(event.target.files[0]);
    }
  };

  const handleQRCodeUpload = () => {
    if (!qrCode) {
      alert('No file uploaded');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: any) => {
      const imageData = e.target.result;
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0, img.width, img.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);

          if (code) {
            try {
              if (code.data) {
                // console.log(code.data);
                setPayload(code.data);
              }
              
              else {
                alert('Invalid challenge key');
              }
            } 
            
            catch (error: any) {
              alert('Error: ' + error.message);
            }
          } 
          
          else {
            alert('Error reading QR code');
          }
        }
      };

      img.src = imageData;
    };

    reader.readAsDataURL(qrCode);
    setQrCode(null);

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="bg-slate-900 w-screen h-screen flex gap-3 items-center justify-center m-auto">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border rounded-md bg-white"
      />

      <button
        onClick={handleQRCodeUpload}
        className="border border-black p-2 rounded-md text-white bg-black"
      >
        Upload QR Code
      </button>

      {authStatus && (
        <p className="mt-4 text-white">
          {authStatus}
        </p>
      )}
    </div>
  );
}
