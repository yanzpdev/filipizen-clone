'use client';
import { useEffect, useState, useRef } from 'react';
import { IoMdSearch } from 'react-icons/io'; 
import Button from '@mui/material/Button';
import { MdLabel } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Roboto } from 'next/font/google';
import ImageComponent from '../ui/ImageComponent';
import { ThemeProvider, createTheme } from '@mui/material';
import { useSession } from 'next-auth/react'; 

interface Partner {
  id: number;
  title: string;
  subtype: string;
  group: { title: string };
}

const roboto = Roboto({ 
  weight: ["400", '500', '700'], 
  subsets: ["latin"]  
});

export let fontTheme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  }
})

interface LoginComponentProps {
  memberData: Partner[];
}

const LoginComponent: React.FC<LoginComponentProps> = ({ memberData }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [disable, setDisable] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [partnerLink, setPartnerLink] = useState<string>('');
  const router = useRouter();
  const {data: session, status } = useSession();

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
    router.push('login');
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

  return (
    <div className='h-[60%] relative w-screen mt-[64px] flex flex-col items-center'>
      <div className='h-[50px]'></div>
      <ThemeProvider theme={fontTheme}>
        <ImageComponent
          src='/assets/filipizen.svg'
          alt='Filipizen Logo'
          width={220}
          height={60.66}
          priority
        />
        <div className='mt-[2rem] min-w-[60%] flex items-center justify-center '>
          <div className='h-fit min-w-[40%] bg-gradient-to-t relative from-white to-[#f5f5f5]'>
            <div
              className='h-[52.8px] relative w-full border border-slate-400 z-40 hover:border-black rounded-full flex items-center justify-center bg-white'
              style={{ boxShadow: '#00000059 0 5px 15px', }}
            >
              <div className='text-[#737373] static w-[15%] h-full z-30 flex bg-white rounded-l-full'>
                <IoMdSearch size={24} className='ml-[20px] self-center font-bold' />
              </div>
              <div className='w-[85%] static z-30 h-full'>
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
              </div>
            </div>
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
                        className='px-[16px] flex items-center text-base justify-start text-[#000000de] py-3'
                        onClick={() => handleClick(partner)}
                      >
                        <MdLabel size={24} className='text-[#9e9e9e] mr-[32px]' /> <div className='truncate'>{partner.title}{partner.subtype !== 'province' && `, ${partner.group.title}`}</div>
                      </button>
                    </li>
                  ))}
                </ul>
              }
            </div>
          </div>
        </div>
  
        <Button
          variant='contained'                                                    // #62000e
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
          variant='contained'
          className={`absolute top-[-40px] text-lg right-14 font-medium text-slate-700 hover:bg-[#e6e9f3] p-[8px] rounded-md`}
          style={{textTransform: 'none'}}
          onClick={redirectToSignIn}
          sx={{backgroundColor: 'transparent'}}
          disabled={status === 'authenticated'}
        >
          {status === 'authenticated' ?
            <p>You are signed in</p>
          :status === 'loading' ?
            <p>Loading...</p>
          :
            <p>Sign in</p>
          }
        </Button>
      </ThemeProvider>
    </div>
  )
}

export default LoginComponent;
