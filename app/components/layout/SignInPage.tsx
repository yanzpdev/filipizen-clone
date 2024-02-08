'use client';
import ContainerComponent from "../ui/ContainerComponent";
import ContentWrapper from "../ui/ContentWrapper";
import ImageComponent from "../ui/ImageComponent";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Raleway } from 'next/font/google';
import { createTheme, ThemeProvider } from "@mui/material/styles"; 
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { signIn } from "next-auth/react";

const raleway = Raleway({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'] 
});

export let theme = createTheme({
  typography: {
    fontFamily: raleway.style.fontFamily,
  }
})

const SignInPage = () => {
  return (
    <ContainerComponent
      className={`h-screen w-screen relative text-slate-700`}
      classes={{}}
      fixed={false}
      disableGutters={true}
      component={undefined}
    >
      <ContentWrapper 
        className={`pt-12 flex items-center justify-center`}
      >
        <ImageComponent 
          src={`/assets/filipizen.svg`} 
          alt={`Filipizen Logo`} 
          width={250} 
          height={250} 
          className={``} 
          layout={``}
        />
      </ContentWrapper>
      <ContentWrapper 
        className={`pt-16 flex items-center justify-center`}
        isSpan={false}
      >
        <FormControl
          className="w-1/3"
        >
          <ThemeProvider theme={theme}>
            <Typography 
              variant='h1' 
              className="pb-8 text-4xl leading-none font-extrabold"
              align='center'
            >
              Sign in to Filipizen
            </Typography>
            <TextField
              className="font-bold w-10/12 self-center rounded-lg"
              variant='outlined'
              label='Email Address'
              size='medium'
              sx={{borderRadius: '8px'}}
              fullWidth={true}
            />
            <Button
              fullWidth={false}
              className="mt-4 w-10/12 py-3 tracking-widest 
              text-lg text-white rounded-md bg-blue-400
              hover:bg-blue-500 self-center"
            >
              Continue
            </Button>
            <Typography 
              variant='body1' 
              className="mt-6 text-sm font-medium leading-none"
              align='center'
            >
              Don&apos;t have an account? 
              <Button
                component='a'
                href={'/registration'}
                className="text-blue-400 normal-case p-0 -mt-[2px] bg-transparent leading-none items-start justify-start"
                disableFocusRipple
                disableRipple
              >
                 Sign up
              </Button>
            </Typography>
            <Typography
              align='center'
            >
              <Button
                fullWidth={false}
                variant='contained'
                className="mt-8 w-10/12 py-3 tracking-widest normal-case 
                text-sm text-slate-800 rounded-md font-semibold 
                hover:bg-slate-300 self-center justify-start gap-3"
                onClick={() => signIn('google')}
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
              >
                <FaFacebook className='text-[#0866ff]' size={32}/>Continue with Facebook
              </Button>
            </Typography>
          </ThemeProvider>
        </FormControl>        
      </ContentWrapper>
    </ContainerComponent>
  )
}

export default SignInPage;