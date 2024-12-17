/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import Image from 'next/image';

const QRCodeComponent = ({ qrCodeUrl, isTimedOut }: { qrCodeUrl: string | null, isTimedOut: boolean }) => (
  <>
    {qrCodeUrl ? (
      <motion.div
        key={qrCodeUrl}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* <Image
          src={qrCodeUrl}
          alt={"QR Code"}
          height={300}
          width={300}
          className="mx-auto rounded-lg"
          priority
        /> */}

        <img src={qrCodeUrl} alt="QR Code" height={300} width={300} className="mx-auto rounded-lg"
         />
      </motion.div>
    ) : (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* <Image
          src={'/assets/roundloading.gif'}
          alt={"Loading"}
          height={300}
          width={300}
          className="mx-auto rounded-lg"
          priority
          unoptimized
        /> */}
        
        <img src={'/assets/roundloading.gif'} alt="Loading" height={300}
          width={300}
          className="mx-auto rounded-lg" />
      </motion.div>
    )}

    {isTimedOut && !qrCodeUrl && (
      <motion.span
        className="text-center text-red-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        There was a problem generating the QR code. Please try again.
      </motion.span>
    )}
  </>
);

export default QRCodeComponent;
