'use client';
import { Container, Typography, createTheme, ThemeProvider } from "@mui/material";
import { Roboto } from "next/font/google";
import Image from "next/image";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
})

export let fontTheme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  }
})

const Custom404 = () => {
  return (
    <ThemeProvider theme={fontTheme}>
      <Container 
        className='my-[16px] static text-slate-800'
        maxWidth='sm'
        disableGutters
      >
        <Image 
          src={"/assets/filipizen.svg"} 
          alt={"Filipizen Logo"} 
          width={220}
          height={60.66}
          className="pt-[32px]"
        />
        <Typography
          variant="h1"
          className="mt-[32px] mb-[16px] text-[28px] font-bold"
        >
          Oops!
        </Typography>
        <Typography
          className="mb-[16px] text-[#000000a6] leading-none font-bold"
        >
          404 - PAGE NOT FOUND
        </Typography>
        <Typography
          className="my-[17.4px] text-[14.8px] text-[#000000a6] leading-snug opacity-70"
          style={{
            display: 'block',
            marginBlockStart: '1em',
            marginBlockEnd: '1em',
            marginInlineStart: '0px',
            marginInlineEnd: '0px',
          }}
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable
        </Typography>
      </Container>
    </ThemeProvider>
    
  );
};

export default Custom404;
