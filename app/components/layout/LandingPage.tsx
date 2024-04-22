'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { IoMdSearch } from 'react-icons/io'; 
import Button from '@mui/material/Button';
import { MdLabel } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Raleway, Roboto } from 'next/font/google';
import ImageComponent from '../ui/ImageComponent';
import { ThemeProvider, createTheme } from '@mui/material';
import { signOut, useSession } from 'next-auth/react'; 
import DropDownMenu from './DropDownMenu';
import ContentWrapper from '../ui/ContentWrapper';

interface Partner {
  id: number;
  title: string;
  subtype: string;
  group: { title: string };
}

const roboto = Roboto({ 
  weight: ["400", '500', '700'], 
  subsets: ["latin"],
  display: 'swap'  
});

export let fontTheme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  }
})
  
interface LandingPageProps {
  memberData: Partner[];
  userEmail: string;
  fullName: string;
  isFirstTimeSigningIn: boolean;
}

const LandingPage:React.FC<LandingPageProps> = ({ memberData, userEmail, fullName, isFirstTimeSigningIn }) => {
    const [searchText, setSearchText] = useState<string>('');
  const [disable, setDisable] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [partnerLink, setPartnerLink] = useState<string>('');
  const router = useRouter();
  const {data: session, status } = useSession();

  const image = session?.user?.image;
  const email = session?.user?.email;

  const filteredPartners = searchText
  ? memberData.filter((partner: Partner) => new RegExp(`^${searchText.replace(/\\/g, '\\\\')}`, 'i').test(partner.title))
  : memberData;

  const sortedFilteredPartners = filteredPartners.sort((a: Partner, b: Partner) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  });

  const handleClick = (param: any) => {
    setSearchText(param.title + (param.subtype !== 'province' ? `, ${param.group.title}` : ''));
    setPartnerLink('/partners/' + param.group.name + '_' + param.name);
    setDropdownVisible(false); 
  }

  const redirectToSignIn = () => {
    router.push('/login');
  }

  const redirectToPartner = () => {
    setIsClicked(true);
    router.push(partnerLink);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (isOpen && !buttonRef.current?.contains(event.target as Node) && event.target !== buttonRef.current) {
      setIsOpen(false);
    }
  }, [isOpen]);
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const buttonRef = useRef<any | null>(null);
  return (
    <ContentWrapper className={`${roboto.className} h-[60%] relative w-screen mt-[64px] flex flex-col items-center`}>
      <ContentWrapper className='h-[50px]'></ContentWrapper>
      <ThemeProvider theme={fontTheme}>
        <ImageComponent
          src='/assets/filipizen.svg'
          alt='Filipizen Logo'
          width={220}
          height={60.66}
          priority
        />
        <ContentWrapper className='mt-[2rem] min-w-[60%] flex items-center justify-center '>
          <ContentWrapper className='h-fit min-w-[40%] bg-gradient-to-t relative from-white to-[#f5f5f5]'>
            <ContentWrapper
              className='h-[52.8px] relative w-full border border-slate-400 z-40 hover:border-black rounded-full flex items-center justify-center bg-white'
              style={{ boxShadow: '#00000059 0 5px 15px', }}
            >
              <ContentWrapper className='text-[#737373] static w-[15%] h-full z-30 flex bg-white rounded-l-full'>
                <IoMdSearch size={24} className='ml-[20px] self-center font-bold' />
              </ContentWrapper>
              <ContentWrapper className='w-[85%] static z-30 h-full'>
                <input
                  autoComplete='off'
                  className={`h-full w-full static search-input text-[.970rem] rounded-full rounded-l-none`}
                  type='text'
                  name='search'
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setDropdownVisible(!!e.target.value);
                    setDisable(!e.target.value);
                    setPartnerLink('');
                  }}
                  placeholder='Search Partner LGU'
                />
              </ContentWrapper>
            </ContentWrapper>
            <div
              className='w-full'
              style={{
                position: 'absolute',
                zIndex: 10,
                top: '2rem',
                display: dropdownVisible ? 'block' : 'none',
              }}
              ref={dropdownRef}
            >
              {searchText &&
                <ul
                  className='h-[231.6px] border-[1px] pt-[27px] flex flex-col rounded-md rounded-br-none bg-white overflow-y-scroll'
                  style={{ boxShadow: '#00000059 0 5px 15px', }}
                >
                  {sortedFilteredPartners.map((partner: Partner) => (
                    <li key={partner.id}>
                      <button
                        className='px-[16px] flex items-center text-base justify-start hover:bg-gray-100 w-full text-[#000000de] py-3'
                        onClick={() => handleClick(partner)}
                      >
                        <MdLabel size={24} className='text-[#9e9e9e] mr-[32px]' /> <div className='truncate'>{partner.title}{partner.subtype !== 'province' && `, ${partner.group.title}`}</div>
                      </button>
                    </li>
                  ))}
                </ul>
              }
            </div>
          </ContentWrapper>
        </ContentWrapper>
      
        <Button
          variant='contained'                                                    
          className={`mt-[34px] text-[14px] ${!partnerLink ? 'text-[#989898]' : ''} bg-[#f5f5f5] font-medium text-[#731cef] hover:bg-[#eeeaf4] p-[8px] rounded-md tracking-[.09em] leading-none`}
          style={{
            boxShadow: 'none',
          }}
          onClick={redirectToPartner}
          disabled={!partnerLink}
        >
           GO TO SERVICES
        </Button>
        <div className='h-[30px]'></div>
        <Button
          variant='contained'
          className={`mt-[38px] text-[14px] font-medium text-[#018786] hover:bg-[#e6f1f1] p-[8px] rounded-md tracking-[.09em] leading-none`}
          style={{ boxShadow: 'none' }}
          sx={{backgroundColor: 'transparent'}}
        >
          <Link href='/partners'>
            VIEW ALL PARTNERS
          </Link> 
        </Button>
      
        <Button
          variant={`${status !== 'authenticated' ? 'contained' : 'text'}`}
          className={`absolute top-[-40px] text-lg right-14 duration-300 font-medium text-slate-700 p-[8px] hover:bg-[#e6e9f3]`}
          style={{textTransform: 'none'}}
          onClick={status !== 'authenticated' ? redirectToSignIn : () => signOut() }
          sx={{backgroundColor: 'transparent'}}
          // disabled={status === 'authenticated'}
        >
          {status === 'authenticated' ?
            <span>Sign Out</span>
          :
            <span>Sign In</span>
          }
        </Button>
        {isOpen && 
          <div ref={buttonRef} className='absolute top-7 right-16 z-50'>
            <DropDownMenu userName={name} buttonRef={buttonRef} image={image} email={email} />
          </div>
        }
      </ThemeProvider>
    </ContentWrapper>
  )
}

export default LandingPage