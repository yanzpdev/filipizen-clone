'use client';
import ContainerComponent from "../ui/ContainerComponent";
import ContentWrapper from "../ui/ContentWrapper";
import ImageComponent from "../ui/ImageComponent";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Raleway, Roboto } from 'next/font/google';
import { createTheme, ThemeProvider } from "@mui/material/styles"; 
import ButtonComponent from "../ui/ButtonComponent";
import Link from "next/link";
import Footer from "./Footer";
import Image from 'next/image';

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
  return (
    <>
      <ContainerComponent
        className={`h-[84.3vh] w-full relative text-slate-700`}
        classes={{}}
        fixed={false}
        disableGutters={true}
      >
        <ContentWrapper 
          className={`mt-20 flex items-center justify-center gap-2`}
        >
          <Link href='/'>
            <Image
              src={`/assets/filipizen.svg`} 
              alt={`Filipizen Logo`} 
              width={250} 
              height={250} 
              priority
            />
          </Link>
        </ContentWrapper>
        <ThemeProvider theme={theme}>
          <ContentWrapper 
            className={`pt-6 flex items-center justify-center`}
            isSpan={false}
          >
            <FormControl className="w-1/3">
              <Image
                src={`/assets/qr-code.svg`}
                alt={"QR Code"}
                height={300}
                width={300}
                className="mx-auto rounded-lg"
                priority
              />
              <Typography 
                variant='body1' 
                className="mt-6 text-sm font-medium leading-none flex flex-col gap-2 items-center justify-center"
                align='center'
              >
                Use the Filipizen App to log in via QR code
                <ContentWrapper className="flex gap-4">
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
                    />
                  </Link>
                  
                </ContentWrapper>
              </Typography>
              <ContentWrapper className="mt-3 mx-auto text-center items-center justify-center flex gap-2">
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
              </ContentWrapper>
            </FormControl>        
          </ContentWrapper>
        </ThemeProvider>
      </ContainerComponent>
      <Footer />
    </>
  )
}

export default SignInPage;