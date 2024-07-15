'use client';
import Link from 'next/link';
import ImageComponent from '../ui/ImageComponent';
import ContentWrapper from '../ui/ContentWrapper';
import { signOut, useSession } from 'next-auth/react';
import { Typography } from '@mui/material';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import ButtonComponent from '../ui/ButtonComponent';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import DropDownMenu from './DropDownMenu';

type DataProps = {
  id: number;
  title: string;
  subtype: string;
  state: string;
  email: string;
  name: string;
  includeservices: string;
  excludeservices: string;
  phoneno: string;
  group: {
    name: string;
    objid: string;
    title: string;
  } 
  channelid: string;
  isonline: string;
}

interface HeaderProps {
  navbarStyles: string
  src: string
  height: number
  width: number
  title: string
  extraStyle?: string;
  userName?: string | any;
  page?: string;
  data?: DataProps;
  headerSelect?: string;
}

const Header:React.FC<HeaderProps> = ({navbarStyles, extraStyle, src, height, width, title, userName, page, data, headerSelect}) => {
  const {data: session, status} = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string | undefined >(userName);
  
  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    setFullName(userName);
  }, [userName])

  const handleSignInClick = () => {
    router.push('/login');
  }

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
    <ContentWrapper className={navbarStyles}>
      <ContentWrapper className='flex pt-[2px] gap-5 items-center justify-center text-white'>
        <Link href={`/partners/${data?.group?.name}_${data?.name}`} className='flex items-center justify-center text-center'>
          <ImageComponent   
            src={src}
            alt='logo'
            width={width || 24}
            height={height || 24}
            priority
          />
          <p className={`${page === 'profile2' ? 'text-[#DDDDDD] text-[21.3333px] ml-[5px]' : ' text-white text-[20px] ml-[10px] pt-[0px]'} font-bold`}>{title}</p>
        </Link>
        {page === 'partner' &&
          <ContentWrapper className='ml-10 text-[#f5f5f5] flex items-center relative justify-center gap-10 text-[20px] font-bold'>
            <Link href={`/partners/${data?.group?.name}_${data?.name}`} className={`px-3 py-1 rounded-md duration-200 relative top-[9px] h-14 ${headerSelect === 'services' ? 'bg-[#f5f5f5] text-[#2c3e50]' : 'hover:bg-[#f5f5f5] hover:text-[#2c3e50]'} `}>Services</Link>
            <Link href={`/partners/${data?.group?.name}_${data?.name}/data`} className={`px-3 py-1 rounded-md duration-200 relative top-[9px] h-14 ${headerSelect === 'data' ? 'bg-[#f5f5f5] text-[#2c3e50]' : 'hover:bg-[#f5f5f5] hover:text-[#2c3e50]'}`}>Data</Link>
          </ContentWrapper>
        }
      </ContentWrapper>

      { status === 'authenticated' ?
        <ContentWrapper className={`${extraStyle} relative text-slate-700 flex justify-center items-center gap-1`}>
          <Typography variant='body1' className='text-xs font-bold'>
            {fullName}
          </Typography>

          {page !== 'profile2' && 
            <button>
              {!isOpen &&
                <HiOutlineDotsHorizontal 
                  className='mx-1 cursor-pointer' 
                  size={26} 
                  onClick={handleClick}
                />
              }
              {isOpen &&
                <HiOutlineDotsHorizontal 
                  className='mx-1 cursor-pointer' 
                  size={26} 
                />
              }
            </button>
          }
          
          {isOpen &&
            <div ref={buttonRef} className='z-50 absolute top-5 right-1'>
              <DropDownMenu page={page} userName={userName} image={session?.user?.image} email={session?.user?.email} />
            </div>
          }
        </ContentWrapper>
      : status === 'loading' ?
        <ContentWrapper className={`${extraStyle} leading-none relative text-slate-700 `}>
            {page !== 'profile2' &&
              <ContentWrapper className='flex justify-center items-center gap-1'>
                <ImageComponent 
                  src={'/assets/roundloading.gif'} 
                  alt={'loading cog'}       
                  height={30} 
                  width={30} 
                  priority
                />
              </ContentWrapper> 
            }
        </ContentWrapper>
      :
        <ContentWrapper>
          <ButtonComponent 
            variant='text' 
            onClick={handleSignInClick}
            className={`normal-case ${page === 'partner' ? 'text-white' : ' text-slate-700'} font-semibold hover:bg-transparent hover:underline`}
            disableFocusRipple
            disableElevation
            disableRipple
            disableTouchRipple
            sx={{
              padding: '0',
            }}
          >
            Sign in
          </ButtonComponent>
        </ContentWrapper>
      }
    </ContentWrapper>
  )
}

export default Header