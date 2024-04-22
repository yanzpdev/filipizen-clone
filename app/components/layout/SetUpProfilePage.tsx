'use client';
import ContentWrapper from "../ui/ContentWrapper";
import { Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { Raleway, Roboto } from 'next/font/google';
import { createTheme, ThemeProvider } from "@mui/material/styles"; 
import { useEffect, useState } from "react";
import { signupFormSchema } from "@/lib/validations/signupform";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "./Footer";
import ButtonComponent from "../ui/ButtonComponent";
import Header from "./Header";

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

interface SetUpProfileProps {
  userEmail: string | '';
  fullName: string | '';
  memberData: any;
}

const SetUpProfilePage:React.FC<SetUpProfileProps> = ({memberData, fullName, userEmail}) => {
  const {data: session, status} = useSession();
  const [name, setName] = useState(fullName);
  const [email, setEmail] = useState(userEmail);
  const [subtype, setSubtype] = useState<string>("");
  const [lgu, setLgu] = useState<any>("");
  const [lguID, setLguID] = useState<string>("");
  const [lguString, setLguString] = useState<string>("");
  const [lguList, setLguList] = useState<any>();
  const [action, setAction] = useState<string>('');
  const [address, setAddress] = useState<string>("");
  const [mobileNum, setMobileNum] = useState<string>("");
  const [isMobileNumValid, setIsMobileNumValid] = useState<boolean>(true);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [responseSuccess, setResponseSuccess] = useState(true);
  const [isResponseReceived, setIsResponseReceived] = useState(true);
  const [isFirstTimeSigningIn, setIsFirstTimeSigningIn] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [validatedData, setValidatedData] = useState<any>();
  const [event, setEvent] = useState<React.FormEvent>();
  const uniqueSubtypesSet = new Set(memberData.map((item: any) => item.subtype));
  const subtypes = Array.from(uniqueSubtypesSet);
  const municipalities = Array.from(memberData.filter((item: any) => item.subtype === 'municipality'));
  const provinces = Array.from(memberData.filter((item: any) => item.subtype === 'province'));
  const cities = Array.from(memberData.filter((item: any) => item.subtype === 'city'));
  const terminals = Array.from(memberData.filter((item: any) => item.subtype === 'terminal'));
  const router = useRouter();

  const validateMobileNum = (mobileNum: string) => {
    const regex = /^\d{11}$/;
    return regex.test(mobileNum);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setName(nameValue);
    validateForm(nameValue, subtype, address, mobileNum);
  }

  const handleSubtypeChange = (e: SelectChangeEvent<string>) => {
    const subtypeValue = e.target.value as string;
    setSubtype(subtypeValue);
    if (subtypeValue === "municipality") {
      setLguList(municipalities);
    }
    else if (subtypeValue === "city") {
      setLguList(cities);
    }
    else if (subtypeValue === "province") {
      setLguList(provinces);
    }
    else if (subtypeValue === "terminal") {
      setLguList(terminals);
    }
    validateForm(fullName, subtypeValue, address, mobileNum);
  }

  const handleLguChange = (e: SelectChangeEvent<any>) => {
    const lguValue = e.target.value;
    setLgu(lguValue);
    setLguID(lguValue.id)
    setLguString(lguValue.title);
    validateForm(name, subtype, address, mobileNum);
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const addressValue = e.target.value;
    setAddress(addressValue);
    validateForm(name, subtype, addressValue, mobileNum);
  }

  const handleMobilenumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mobilenumValue = e.target.value;
    setMobileNum(mobilenumValue);
    validateForm(name, subtype, address, mobilenumValue);
    setIsMobileNumValid(validateMobileNum(mobilenumValue));
    setIsFormValid(validateMobileNum(mobilenumValue));
  }

  const validateForm = (name: string, subtype: string, address: string, mobileNum: string) => {
    if (name.trim() !== "" && subtype.trim() !== "" && address.trim() !== "" && mobileNum.trim().length === 11) {
      setIsFormValid(true);
    } 
    
    else {
      setIsFormValid(false);
    }
  }

  const handleSubmit = async() => {
    setIsResponseReceived(false);
    try {
      const validatedData = signupFormSchema.parse({ email, subtype, lguString, lguID, name, address, mobileNum, isFirstTimeSigningIn });
      setValidatedData(validatedData);
      console.log(validatedData)
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
      setName("");
      setSubtype("");
      setLgu("");
      setLguString("");
      setLguID("");
      setLguList(null);
      setAddress("");
      setMobileNum("");
      setIsFormValid(false);
    }

    catch (err: any) {
      console.log('Error: ', err.message)
    }
    router.push('/partners');
  }

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    setEvent(e)
    handleModalOpen('submit');
  }
  
  const handleModalOpen = (action: string) => {
    setAction(action);
    setIsModalOpen(true);
  }


  useEffect(() => {
    const handleWindowClose = async (event: BeforeUnloadEvent) => {
      const confirmationMessage = 'Are you sure you want to leave this site? Changes you made may not be saved.';
      event.preventDefault();
      event.returnValue = confirmationMessage;
      // works on reload but not on tab close
      // await signOut({ redirect: false, callbackUrl: '/' });
    };
  
    window.addEventListener('beforeunload', handleWindowClose);
  
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    };
  }, []);

  if (status === 'authenticated') {
    return (
      <ContentWrapper className="h-screen">
        {isModalOpen &&
          <ContentWrapper 
            className="z-40 h-screen flex items-center justify-center fixed w-screen" 
            onClick={() => setIsModalOpen(false)}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <ThemeProvider theme={fontTheme}>
              <ContentWrapper className="h-fit w-fit fixed bg-white rounded-lg p-6 drop-shadow-xl flex flex-col gap-2 items-center justify-center">
                <Typography className="text-2xl font-semibold text-center">
                  {action === 'submit' ? 'Confirm Submission' : 'Cancel Profile Setup?'}
                </Typography>
                <Typography className="text-center">
                  {action === 'submit' ? 'Are you sure you want to submit this information?' : 'Cancelling setup will sign you out, proceed?'}
                </Typography>
                <ContentWrapper className="flex gap-3 items-center justify-center">
                  <ButtonComponent 
                    color="success"
                    variant="contained"
                    className="bg-green-500"
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                    onClick={action === 'submit' ? handleSubmit : signOut}
                  >
                    {action === 'submit' ? 'OK' : 'Yes'}
                  </ButtonComponent>
                  <ButtonComponent
                    color="error"
                    variant="contained"
                    className="bg-red-500"
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                  >
                    {action === 'submit' ? 'Cancel' : 'No'}
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
          <Header 
            navbarStyles="w-screen px-[50px] pb-[5px] pt-[3px] bg-[#2c3e50] h-[50px] flex justify-between items-center" 
            src={`/assets/filipizen.svg`}
            height={40}
            width={100}
            title=''
            extraStyle=''
            page='profile2'
          />
          <ThemeProvider theme={fontTheme}>
            <Container className={`h-[88.5vh] w-full flex relative pb-[50px]`}> 
              <aside className="w-[17%] h-full">
              </aside>
              <Paper
                className={`p-[20px] mt-[10px] w-[66%] h-fit flex items-center border rounded-lg pb-10 bg-white`}
                style={{
                  boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)', 
                  border: 'none',
                }}
              >
                <form
                  className="px-[16px] w-full h-full"
                  onSubmit={handleSubmitClick}
                >
                  <Typography className="text-[1.7em] pb-3 font-semibold">
                    Set up your profile
                  </Typography>
                    <TextField
                      className="font-bold w-full self-center rounded-lg"
                      variant='standard'
                      label='Full Name *'
                      size='medium'
                      sx={{borderRadius: '8px'}}
                      fullWidth={true}
                      onChange={handleNameChange}
                      helperText={' '}
                      value={name}
                      name={`firstName`} 
                    />
                  <TextField
                    className="font-bold w-full mb-6 self-center rounded-lg"
                    variant='standard'
                    size='medium'
                    sx={{borderRadius: '8px'}}
                    fullWidth={true}
                    value={email}
                    name={`email`} 
                    disabled
                  />
                  <FormControl fullWidth>
                  <InputLabel id="lgutype-label" className="-ml-3">LGU Type * </InputLabel>
                    <Select
                      className="capitalize mb-6"
                      labelId="lgutype-label"
                      id="lgutype"
                      label="LGU Type *"
                      value={subtype}
                      variant="standard"
                      onChange={handleSubtypeChange}
                    >
                      {subtypes.map((item: any, index: number) => (
                        <MenuItem key={index} value={item} className='capitalize'>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                  <InputLabel id="lgutype-label" className="-ml-3 capitalize">{subtype === '' ? 'LGU *' : subtype + ' *'}</InputLabel>
                    <Select
                      className="capitalize mb-6 relative"
                      labelId="lgutype-label"
                      id="lgutype"
                      label={subtype === '' ? 'LGU *' : subtype + ' *'}
                      value={lgu}
                      disabled={subtype === ''}
                      variant="standard"
                      onChange={handleLguChange}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            height: 'auto',
                            maxHeight: '200px'
                          }
                        } 
                      }}
                    >
                      {lguList?.map((item: any, index: number) => (
                        <MenuItem key={index} value={item} className='capitalize relative'>
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    className="font-bold w-full self-center rounded-lg"
                    variant='standard'
                    label='Contact Address *'
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
                    label='Mobile No. *'
                    size='medium'
                    type='number'
                    sx={{borderRadius: '8px'}}
                    fullWidth={true}
                    onChange={handleMobilenumChange}
                    helperText={!isMobileNumValid && mobileNum !== '' ? 'Please enter a valid mobile number.' : ' '}
                    value={mobileNum}
                    name={`mobilenum`} 
                  />
                  <ContentWrapper className="flex items-center justify-between">
                    <Button
                      variant="text"
                      fullWidth={false}
                      onClick={() => handleModalOpen('cancel')}
                      className={`mt-4 w-fit py-3 tracking-widest text-lg rounded-md text-gray-500 self-end `}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth={false}
                      className={`mt-4 w-fit py-3 tracking-widest 
                      text-lg text-white rounded-md self-end   
                      ${!isFormValid ? 'bg-blue-100' : 'bg-[#3f51b5] hover:bg-blue-500'}`}
                      disabled={!isFormValid}
                    >
                      Submit
                    </Button>
                  </ContentWrapper>
                  
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

  else if (status === 'unauthenticated') {
    redirect('/')
  }

}

export default SetUpProfilePage;