'use client';
import ContainerComponent from "../ui/ContainerComponent";
import ContentWrapper from "../ui/ContentWrapper";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Raleway, Roboto } from 'next/font/google';
import { createTheme, ThemeProvider } from "@mui/material/styles"; 
import { useEffect, useState } from "react";
import { signupFormSchema } from "@/lib/validations/signupform";
import ImageComponent from "../ui/ImageComponent";
import { motion, AnimatePresence } from 'framer-motion';
import ButtonComponent from "../ui/ButtonComponent";
import Header from "./Header";
import Footer from "./Footer";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

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
    fontFamily: roboto.style.fontFamily,
  }
})

interface ProfileProps {
  name: string;
  contactAddress: string;
  contactNum: string;
  contactEmail: string;
}

const ProfilePage:React.FC<ProfileProps> = ({name, contactAddress, contactNum, contactEmail}) => {
  const [fullName, setFullName] = useState<string>(name);
  const [email, setEmail] = useState<string | any>(contactEmail);
  const [address, setAddress] = useState<string>(contactAddress);
  const [mobileNum, setMobileNum] = useState<string>(contactNum);
  const [isMobileNumValid, setIsMobileNumValid] = useState<boolean>(true);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [responseMsg, setResponseMsg] = useState<string>();
  const [responseSuccess, setResponseSuccess] = useState(true);
  const [isResponseReceived, setIsResponseReceived] = useState(true);
  const [isFirstTimeSigningIn, setIsFirstTimeSigningIn] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const [event, setEvent] = useState<React.FormEvent>();
  const [validatedData, setValidatedData] = useState<any>();
  const {data: session, status} = useSession();

  useEffect(() => {
    if (responseMsg !== '') {
      setIsVisible(true);
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000); 
      return () => clearTimeout(timeout);
    }
  }, [responseMsg]);

  const validateMobileNum = (mobileNum: string) => {
    const regex = /^\d{11}$/;
    return regex.test(mobileNum);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setFullName(nameValue);
    validateForm(nameValue, address, mobileNum);
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const addressValue = e.target.value;
    setAddress(addressValue);
    validateForm(fullName, addressValue, mobileNum);
  }

  const handleMobilenumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mobilenumValue = e.target.value;
    setMobileNum(mobilenumValue);
    validateForm(fullName, address, mobilenumValue);
    setIsMobileNumValid(validateMobileNum(mobilenumValue));
    setIsFormValid(validateMobileNum(mobilenumValue));
  }

  const validateForm = (fullName: string, address: string, mobileNum: string) => {
    if (fullName.trim() !== "" && address.trim() !== "" && mobileNum.trim().length === 11) {
      setIsFormValid(true);
    } 
    
    else {
      setIsFormValid(false);
    }
  }

  const handleSubmit = async() => {
    setIsResponseReceived(false);
    try {
      const validatedData = signupFormSchema.parse({ email, fullName, address, mobileNum, isFirstTimeSigningIn });
      setValidatedData(validatedData);
      const response = await fetch("/api/editprofile", {
        method: "POST",
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setResponseMsg(responseData.message);
        setIsResponseReceived(true);
        setResponseSuccess(true);
        setIsVisible(true);
      } 
      
      else {
        const errorMessage = await response.text();
        setResponseMsg(errorMessage);
        setIsResponseReceived(true);
        setResponseSuccess(false);
        setIsVisible(true);
      }
      setIsFormValid(false);
    }

    catch (err: any) {
      console.log('Error: ', err.message)
    }
  }

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    setEvent(e)
    setIsModalOpen(true)
  }

  if (status === 'unauthenticated') {
    redirect('/partners')
  }

  else {
    return (
      <ContentWrapper className="h-screen">
        <Header 
          navbarStyles='w-screen px-[50px] pt-[5px] pb-[7px] bg-[#ecf0f1] flex justify-between items-center' 
          src='/assets/filipizen.svg'
          height={20.06}
          width={72.75} 
          title=''
          page='profile'
          userName={
            validatedData ? validatedData.fullName 
            : 
            responseSuccess ? name
            :
            ''
          }
        />
        <Header 
          navbarStyles="w-screen px-[50px] pb-[5px] pt-[3px] bg-[#2c3e50] h-[50px] flex justify-between items-center" 
          src={`https://www.filipizen.com/assets/154.png`}
          height={40}
          width={40}
          title='TAGBILARAN CITY'
          extraStyle=''
          page='profile2'
        />
        {isModalOpen &&
          <ContentWrapper 
            className="z-40 h-screen flex items-center justify-center fixed w-screen" 
            onClick={() => setIsModalOpen(false)}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <ThemeProvider theme={fontTheme}>
              <ContentWrapper className="h-fit w-fit fixed bg-white rounded-lg p-6 drop-shadow-xl flex flex-col gap-2 items-center justify-center">
                  <Typography className="text-2xl font-semibold text-center">
                    Confirm update
                  </Typography>
                  <ContentWrapper className="flex gap-3 items-center justify-center">
                    <ButtonComponent 
                      color="success"
                      variant="contained"
                      className="bg-green-500"
                      disableFocusRipple
                      disableRipple
                      disableTouchRipple
                      onClick={handleSubmit}
                    >
                      Yes
                    </ButtonComponent>
                    <ButtonComponent
                      color="error"
                      variant="contained"
                      className="bg-red-500"
                      disableFocusRipple
                      disableRipple
                      disableTouchRipple
                    >
                      Cancel
                    </ButtonComponent>
                  </ContentWrapper>
              </ContentWrapper>
            </ThemeProvider>
          </ContentWrapper>
        }
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ThemeProvider theme={fontTheme}>
            <Container
              className={`h-[83vh] w-full flex relative pb-[50px]`}
              // classes={{}}
              // fixed={false}
              // component={undefined}
              // maxWidth={'xl'}
            > 
              <aside className="w-[17%] h-full">

              </aside>
              <Paper
                className={`p-[20px] mt-[10px] w-[66%] h-fit flex items-center border rounded-lg pb-10 bg-white`}
                style={{boxShadow: 'none', border: 'none'}}
              >
                <form
                  className="px-[16px] w-full h-full"
                  onSubmit={handleSubmitClick}
                >
                  <Typography
                    className="text-[1.7em] pb-3 font-semibold"
                  >
                    Edit your profile information
                  </Typography>
      
                  {/* <ContentWrapper className="flex gap-2 items-center justify-center"> */}
                    <TextField
                      className="font-bold w-full self-center rounded-lg"
                      variant='standard'
                      label='Full Name *'
                      size='medium'
                      sx={{borderRadius: '8px'}}
                      fullWidth={true}
                      onChange={handleNameChange}
                      helperText={' '}
                      value={fullName}
                      name={`firstName`} 
                    />
                    {/* <TextField
                      className="font-bold w-full self-center rounded-lg"
                      variant='standard'
                      label='Last Name'
                      size='medium'
                      sx={{borderRadius: '8px'}}
                      fullWidth={true}
                      onChange={handleLastNameChange}
                      helperText={' '}
                      value={lastName}
                      name={`lastName`} 
                    /> */}
                  {/* </ContentWrapper> */}
                  <TextField
                    className="font-bold w-full pb-6 self-center rounded-lg"
                    variant='standard'
                    size='medium'
                    sx={{borderRadius: '8px'}}
                    fullWidth={true}
                    value={email}
                    name={`email`} 
                    disabled
                  />
                  <TextField
                    className="font-bold w-full self-center rounded-lg"
                    variant='standard'
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
                    variant='standard'
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
                    Update
                  </Button>
                  <AnimatePresence>
                    {isVisible && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.7 }}
                        className={`mt-5  ${responseSuccess ? 'text-green-600' : 'text-red-600'} text-2xl text-center font-bold`}
                      >
                        {responseMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </Paper>
              <aside className="w-[17%] h-full">

              </aside>
            </Container>
          </ThemeProvider>   
        </motion.div>
        <Footer />
      </ContentWrapper>
    )
  }
}

export default ProfilePage;