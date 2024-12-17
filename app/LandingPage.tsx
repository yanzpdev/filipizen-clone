'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IoMdSearch } from 'react-icons/io'; 
import Button from '@/components/io/Button';
import { MdLabel } from 'react-icons/md';
import Link from 'next/link';
import { Roboto } from 'next/font/google';
import { ThemeProvider, createTheme } from '@mui/material';
import Panel from '@/components/io/Panel';
import Image from 'next/image';

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
}

const LandingPage:React.FC<LandingPageProps> = ({ memberData }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [partnerLink, setPartnerLink] = useState<string>('');

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
    <Panel className={`${roboto.className} h-[60%] relative w-screen mt-[64px] flex flex-col items-center`}>
      <Panel className='h-[50px]'></Panel>
      <ThemeProvider theme={fontTheme}>
        <Image
          src='/assets/filipizen.svg'
          alt='Filipizen Logo'
          width={220}
          height={60.66}
          priority
        />
        <Panel className='mt-[2rem] min-w-[60%] flex items-center justify-center '>
          <Panel className='h-fit min-w-[40%] bg-gradient-to-t relative from-white to-[#f5f5f5]'>
            <Panel
              className='h-[52.8px] relative w-full border border-slate-400 z-40 hover:border-black rounded-full flex items-center justify-center bg-white'
              style={{ boxShadow: '#00000059 0 5px 15px', }}
            >
              <Panel className='text-[#737373] static w-[15%] h-full z-30 flex bg-white rounded-l-full'>
                <IoMdSearch size={24} className='ml-[20px] self-center font-bold' />
              </Panel>
              <Panel className='w-[85%] static z-30 h-full'>
                <input
                  autoComplete='off'
                  className={`h-full w-full static search-input text-[.970rem] rounded-full rounded-l-none`}
                  type='text'
                  name='search'
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setDropdownVisible(!!e.target.value);
                    // setDisable(!e.target.value);
                    setPartnerLink('');
                  }}
                  placeholder='Search Partner LGU'
                />
              </Panel>
            </Panel>
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
                      <Button
                        className='px-[16px] flex items-center font-normal text-base justify-start hover:bg-gray-100 w-full text-[#000000de] py-3'
                        onClick={() => handleClick(partner)}
                        sx={{ textTransform: 'none' }}
                      >
                        <MdLabel size={24} className='text-[#9e9e9e] mr-[32px]' /> <div className='truncate'>{partner.title}{partner.subtype !== 'province' && `, ${partner.group.title}`}</div>
                      </Button>
                    </li>
                  ))}
                </ul>
              }
            </div>
          </Panel>
        </Panel>
      
        <Button
          variant='contained'                                                    
          className={`mt-[34px] text-[14px] ${!partnerLink ? 'text-[#989898]' : ''} bg-[#f5f5f5] font-medium text-[#731cef] hover:bg-[#eeeaf4] rounded-md tracking-[.09em] leading-none`}
          style={{
            boxShadow: 'none',
            padding: '0px',
          }}
          disabled={!partnerLink}
        >
          <Link 
            className='w-full h-full p-[8px]' 
            href={partnerLink}
          >
            GO TO SERVICES
          </Link> 
        </Button>
        <div className='h-[30px]'></div>
        <Button
          variant='contained'
          className={`mt-[38px] text-[14px] font-medium text-[#018786] hover:bg-[#e6f1f1] rounded-md tracking-[.09em] leading-none`}
          style={{ 
            boxShadow: 'none',
            padding: '0px',
          }}
          sx={{backgroundColor: 'transparent'}}
        >
          <Link 
            className='w-full p-[8px] h-full' 
            href='/partners'
          >
            VIEW ALL PARTNERS
          </Link> 
        </Button>
      
        <Button
          variant="contained"
          className={`absolute top-[-40px] text-lg right-14 duration-300 font-medium text-slate-700 hover:bg-[#e6e9f3]`}
          style={{textTransform: 'none'}}
          sx={{backgroundColor: 'transparent'}}
        >
          <Link 
            className='w-full py-[2px] h-full' 
            href='/login'
          >
            Sign In
          </Link> 
        </Button>
      </ThemeProvider>
    </Panel>
  )
}

export default LandingPage