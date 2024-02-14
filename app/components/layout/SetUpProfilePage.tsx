'use client';
import ContainerComponent from "../ui/ContainerComponent";
import ContentWrapper from "../ui/ContentWrapper";
import { Button, TextField, Typography } from "@mui/material";
import { Raleway, Roboto } from 'next/font/google';
import { createTheme, ThemeProvider } from "@mui/material/styles"; 
import { useEffect, useState } from "react";
import { signupFormSchema } from "@/lib/validations/signupform";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import ImageComponent from "../ui/ImageComponent";

const raleway = Raleway({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  display: 'swap' 
});

const roboto = Roboto({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'],
  display: 'swap' 
});

export let fontTheme = createTheme({
  typography: {
    fontFamily: raleway.style.fontFamily,
  }
})


const SetUpProfilePage = () => {
  const {data: session, status} = useSession();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string | any>(session?.user?.email);
  const [address, setAddress] = useState<string>("");
  const [mobileNum, setMobileNum] = useState<string>("");
  const [isMobileNumValid, setIsMobileNumValid] = useState<boolean>(true);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [responseSuccess, setResponseSuccess] = useState(true);
  const [isResponseReceived, setIsResponseReceived] = useState(true);
  const [isFirstTimeSigningIn, setIsFirstTimeSigningIn] = useState<boolean>(false)
  const router = useRouter();

  useEffect(() => {
    setEmail(session?.user?.email);
  }, [session]);

  // console.log(email);  
  const validateMobileNum = (mobileNum: string) => {
    const regex = /^\d{11}$/;
  return regex.test(mobileNum);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const firstNameValue = e.target.value;
    setFirstName(firstNameValue);
    validateForm(firstNameValue, lastName, address, mobileNum);
  }

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastNameValue = e.target.value;
    setLastName(lastNameValue);
    validateForm( firstName, lastNameValue, address, mobileNum);
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const addressValue = e.target.value;
    setAddress(addressValue);
    validateForm(firstName, lastName, addressValue, mobileNum);
  }

  const handleMobilenumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mobilenumValue = e.target.value;
    setMobileNum(mobilenumValue);
    validateForm(firstName, lastName, address, mobilenumValue);
    setIsMobileNumValid(validateMobileNum(mobilenumValue));
    setIsFormValid(validateMobileNum(mobilenumValue));
  }

  const validateForm = (firstName: string, lastName: string, address: string, mobileNum: string) => {
    if (firstName.trim() !== "" && lastName.trim() !== "" && address.trim() !== "" && mobileNum.trim().length === 11) {
      setIsFormValid(true);
    } 
    
    else {
      setIsFormValid(false);
    }
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setIsResponseReceived(false);
    try {
      const validatedData = signupFormSchema.parse({ email, firstName, lastName, address, mobileNum, isFirstTimeSigningIn });
      // console.log('Validated data: ', validatedData)
      const response = await fetch("/api/editprofile", {
        method: "POST",
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        const responseData = await response.text();
        setResponseMsg(responseData);
        setIsResponseReceived(true);
        setResponseSuccess(true);
      } 
      
      else {
        const errorMessage = await response.text();
        setResponseMsg(errorMessage);
        setIsResponseReceived(true);
        setResponseSuccess(false);
      }
      setFirstName("");
      setLastName("");
      setAddress("");
      setMobileNum("");
      setIsFormValid(false);
    }

    catch (err: any) {
      console.log('Error: ', err.message)
    }
    router.push('/signinchecker');
  }

  return (
    <div className="flex">
      <ContainerComponent
        className={`h-screen w-7/12 relative text-slate-700`}
        classes={{}}
        fixed={false}
        disableGutters={true}
        component={undefined}
      >
        
        <ContentWrapper 
          className={`pt-16 flex items-center justify-center`}
          isSpan={false}
        >
          <ThemeProvider theme={fontTheme}>
            <form
              className="w-8/12 mx-auto"
              onSubmit={handleSubmit}
            >
              <Typography 
                variant='h1' 
                className="pb-12 text-4xl leading-none font-extrabold"
                align='left'
              >
                Set up your profile
              </Typography>
              <ContentWrapper className="flex gap-2 items-center justify-center">
                <TextField
                  className="font-bold w-full self-center rounded-lg"
                  variant='outlined'
                  label='First Name'
                  size='medium'
                  sx={{borderRadius: '8px'}}
                  fullWidth={true}
                  onChange={handleFirstNameChange}
                  helperText={' '}
                  value={firstName}
                  name={`firstName`} 
                />
                <TextField
                  className="font-bold w-full self-center rounded-lg"
                  variant='outlined'
                  label='Last Name'
                  size='medium'
                  sx={{borderRadius: '8px'}}
                  fullWidth={true}
                  onChange={handleLastNameChange}
                  helperText={' '}
                  value={lastName}
                  name={`lastName`} 
                />
              </ContentWrapper>
              <TextField
                className="font-bold w-full pb-6 self-center rounded-lg"
                variant='outlined'
                size='medium'
                sx={{borderRadius: '8px'}}
                fullWidth={true}
                value={email}
                name={`email`} 
                disabled
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
                error={!isMobileNumValid && mobileNum !== ''}
                className="font-bold w-full self-center rounded-lg"
                variant='outlined'
                label='Mobile No.'
                size='medium'
                type='number'
                sx={{borderRadius: '8px'}}
                fullWidth={true}
                onChange={handleMobilenumChange}
                helperText={!isMobileNumValid && mobileNum !== '' ? 'Please enter a valid mobile number.' : ' '}
                value={mobileNum}
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
      <ContainerComponent className="bg-amber-900 h-screen w-5/12">
      <ContentWrapper 
        className={`pt-12 flex items-center gap-1 justify-center`}
      > 
        <ImageComponent 
          src={`/assets/filipizen.svg`} 
          alt={`Filipizen Logo`} 
          width={350} 
          height={350} 
          className={``} 
          priority={true}
        />
      </ContentWrapper>
      </ContainerComponent>
    </div>
    
  )
}

export default SetUpProfilePage;