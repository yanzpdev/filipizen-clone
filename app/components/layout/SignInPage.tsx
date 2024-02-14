'use client';
import ContainerComponent from "../ui/ContainerComponent";
import ContentWrapper from "../ui/ContentWrapper";
import ImageComponent from "../ui/ImageComponent";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Raleway, Roboto } from 'next/font/google';
import { createTheme, ThemeProvider } from "@mui/material/styles"; 
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ButtonComponent from "../ui/ButtonComponent";

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
  const {data: session, status} = useSession();
  if (session) {
    redirect('/signinchecker');
  }

  else {
    return (
      <>
        {status === 'loading' ?
          <ContainerComponent className="h-screen w-screen">
          </ContainerComponent>
        :
          <ContainerComponent
            className={`h-screen w-screen relative text-slate-700`}
            classes={{}}
            fixed={false}
            disableGutters={true}
          >
            <ContentWrapper 
              className={`pt-6 flex items-center justify-center gap-2`}
            >
              <ThemeProvider theme={theme2}>
                <Typography 
                  variant='h1' 
                  className="text-5xl leading-none font-extrabold"
                  align='center'
                >
                  Sign in to 
                </Typography>
              </ThemeProvider>
              <ImageComponent 
                src={`/assets/filipizen.svg`} 
                alt={`Filipizen Logo`} 
                width={250} 
                height={250} 
                className={``} 
                priority={true}
              />
            </ContentWrapper>
            <ThemeProvider theme={theme}>
              <Typography 
                variant='h1' 
                className="text-sm pt-6  font-medium leading-none"
                align='center'
              >
                with
              </Typography>

              <ContentWrapper 
                className={`pt-6 flex items-center justify-center`}
                isSpan={false}
              >
                <FormControl className="w-1/3">
                  <ImageComponent 
                    src={"/assets/qr-code.png"} 
                    alt={"QR Code"} 
                    height={220}
                    width={220}
                    className="mx-auto rounded-lg"
                    priority={true}
                  />
                  <Typography 
                    variant='body1' 
                    className="mt-6 text-sm font-medium leading-none flex flex-col gap-2 items-center justify-center"
                    align='center'
                  >
                    Use the Filipizen App to sign in via QR code
                    <ContentWrapper className="flex gap-4">
                      <ButtonComponent
                        variant="text"
                        className=""
                        href="https://play.google.com/store/apps"
                        target="_blank"
                      >
                        <ImageComponent 
                          src={"/assets/googleplay.png"} 
                          alt={"Google Play"} 
                          width={120}
                          height={100}
                        />
                      </ButtonComponent>
                      
                      <ButtonComponent
                        variant="text"
                        className=""
                        href="https://www.apple.com/ph/app-store/"
                        target="_blank"
                      >
                        <ImageComponent 
                          src={"/assets/appstore.png"} 
                          alt={"App Store"} 
                          width={120}
                          height={100}
                        />
                      </ButtonComponent>
                      
                    </ContentWrapper>
                  </Typography>
                  
                  <ContentWrapper className="flex gap-2 mt-4 items-center justify-center mx-auto">
                    <hr style={{ width: '100px', border: '0.3px solid #334155' }} />
                    <Typography 
                      variant='h1' 
                      className="text-sm font-medium leading-none"
                      align='center'
                    >
                      or
                    </Typography>
                    <hr style={{ width: '100px', border: '0.3px solid #334155' }} />
                  </ContentWrapper>

                  <Typography
                    align='center'
                  >
                    <Button
                      fullWidth={false}
                      variant='contained'
                      className="mt-4 w-10/12 py-3 tracking-widest normal-case 
                      text-sm text-slate-800 rounded-md font-semibold 
                      hover:bg-slate-300 self-center justify-start gap-3"
                      onClick={() => signIn('google')}
                      sx={{backgroundColor: 'transparent'}}
                    >
                      <FcGoogle size={32}/>Continue with Google
                    </Button>
                    <Button
                      fullWidth={false}
                      variant='contained'
                      className="mt-4 w-10/12 py-3 tracking-widest normal-case 
                      text-sm text-slate-800 rounded-md font-semibold
                      hover:bg-slate-300 self-center justify-start gap-3"
                      onClick={() => signIn('facebook')}
                      sx={{backgroundColor: 'transparent'}}
                    >
                      <FaFacebook className='text-[#0866ff]' size={32}/>Continue with Facebook
                    </Button>
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
        }
      </>
    )
  }
}

export default SignInPage;