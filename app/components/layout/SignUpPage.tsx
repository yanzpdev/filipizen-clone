'use client';
import ContainerComponent from "../ui/ContainerComponent";
import ContentWrapper from "../ui/ContentWrapper";
import ImageComponent from "../ui/ImageComponent";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Raleway } from 'next/font/google';
import { createTheme, ThemeProvider } from "@mui/material/styles"; 
import { useState } from "react";
import { signupFormSchema } from "@/lib/validations/signupform";

const raleway = Raleway({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'] 
});

export let fontTheme = createTheme({
  typography: {
    fontFamily: raleway.style.fontFamily,
  }
})

const SignUpPage = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [mobilenum, setMobilenum] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [responseSuccess, setResponseSuccess] = useState(true);
  const [isResponseReceived, setIsResponseReceived] = useState(true);


  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
    setIsFormValid(validateEmail(emailValue));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setName(nameValue);
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const addressValue = e.target.value;
    setAddress(addressValue);
  }

  const handleMobilenumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mobilenumValue = e.target.value;
    setMobilenum(mobilenumValue);
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setIsResponseReceived(false);
    try {
      const validatedData = signupFormSchema.parse({ email, name, address, mobilenum });
      console.log(validatedData)
      // const response = await fetch("/api/signup", {
      //   method: "POST",
      //   body: JSON.stringify(validatedData),
      // });

      // if (response.ok) {
      //   const responseData = await response.text();
      //   setResponseMsg(responseData);
      //   setIsResponseReceived(true);
      //   setResponseSuccess(true);
      // } 
      
      // else {
      //   const errorMessage = await response.text();
      //   setResponseMsg(errorMessage);
      //   setIsResponseReceived(true);
      //   setResponseSuccess(false);
      // }
      setName("");
      setEmail("");
      setAddress("");
      setMobilenum("");
      setIsFormValid(false);
    }

    catch (err: any) {
      console.log(err.message)
    }
  }

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
          priority={true}
        />
      </ContentWrapper>
      <ContentWrapper 
        className={`pt-16 flex items-center justify-center`}
        isSpan={false}
      >
        <ThemeProvider theme={fontTheme}>
          <form
            className="w-1/3 mx-auto"
            onSubmit={handleSubmit}
          >
            <Typography 
              variant='h1' 
              className="pb-8 text-4xl leading-none font-extrabold"
              align='center'
            >
              Create Account
            </Typography>
            <TextField
              className="font-bold w-full self-center rounded-lg"
              variant='outlined'
              label='Contact Name'
              size='medium'
              sx={{borderRadius: '8px'}}
              fullWidth={true}
              onChange={handleNameChange}
              helperText={' '}
              value={name}
              name={`name`} 
            />
            <TextField
              className="font-bold w-full self-center rounded-lg"
              variant='outlined'
              label='Contact Address'
              size='medium'
              sx={{borderRadius: '8px'}}
              fullWidth={true}
              onChange={handleAddressChange}
              helperText={' '}
              value={address}
              name={`address`} 
            />
            <TextField
              error={!isEmailValid && email !== ''}
              className="font-bold w-full self-center rounded-lg"
              variant='outlined'
              label='Email Address'
              size='medium'
              sx={{borderRadius: '8px'}}
              fullWidth={true}
              onChange={handleEmailChange}
              helperText={!isEmailValid && email !== '' ? 'Please enter a valid email address' : ' '}
              value={email}
              name={`email`} 
            />
            <TextField
              className="font-bold w-full self-center rounded-lg"
              variant='outlined'
              label='Mobile No.'
              size='medium'
              type='number'
              sx={{borderRadius: '8px'}}
              fullWidth={true}
              onChange={handleMobilenumChange}
              helperText={' '}
              value={mobilenum}
              name={`mobilenum`} 
            />
            <Button
              type="submit"
              fullWidth={false}
              className={`mt-4 w-full py-3 tracking-widest 
              text-lg text-white rounded-md self-center 
              ${!isFormValid ? 'bg-blue-100' : 'bg-blue-400 hover:bg-blue-500'}`}
              disabled={!isFormValid}
            >
              Submit
            </Button>
          </form>

          <ContentWrapper className='absolute self-center mx-auto bottom-6 w-full flex items-center justify-center'>
            <Typography component='button' className="hover:underline font-semibold underline-offset-2">
              Terms of Use
            </Typography>
             | 
            <Typography component='button' className="hover:underline font-semibold underline-offset-2">
              Privacy Policy
            </Typography>
          </ContentWrapper>
        </ThemeProvider>
      </ContentWrapper>
    </ContainerComponent>
  )
}

export default SignUpPage;