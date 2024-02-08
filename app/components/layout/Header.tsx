'use client';
import Link from 'next/link';
import ImageComponent from '../ui/ImageComponent';
import ContentWrapper from '../ui/ContentWrapper';
import { signOut, useSession } from 'next-auth/react';
import { Typography } from '@mui/material';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import ButtonComponent from '../ui/ButtonComponent';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  navbarStyles: string
  src: string
  height: number
  width: number
  title: string
  extraStyle?: string;
}

const Header:React.FC<HeaderProps> = ({navbarStyles, extraStyle, src, height, width, title}) => {
  const {data: session, status} = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  const handleSignInClick = () => {
    router.push('/login');
  }
  const handleClickOutside = (event: MouseEvent) => {
    if (isOpen && !buttonRef.current?.contains(event.target as Node) && event.target !== buttonRef.current) {
      setIsOpen(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const buttonRef = useRef<any | null>(null);

  return (
    <ContentWrapper className={navbarStyles}>
      <Link href='/' className='flex items-center justify-center'>
        <ImageComponent 
          src={src}
          alt='logo'
          width={width || 24}
          height={height || 24}
          priority={true}
        />
        <p className='ml-[10px] text-white text-[20px] font-bold pt-[2px]'>{title}</p>
      </Link>
      {status === 'authenticated' ?
        <ContentWrapper className={`${extraStyle} relative text-slate-700 flex justify-center items-center gap-1`}>
          <Typography variant='body1' className='text-xs font-bold'>
            {session?.user?.name}
          </Typography>

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

          {isOpen &&
            <div 
              className='absolute top-6 right-1 w-fit text-slate-700 p-6 border rounded-lg bg-[#f5f5f5]'
              ref={buttonRef}
            >
              <p>test</p>
            </div> 
          }

        </ContentWrapper>
      :status === 'loading' ?
        <ContentWrapper className={`${extraStyle} leading-none relative text-slate-700 flex justify-center items-center gap-1`}>
          <Typography variant='body1' className='text-xs font-bold'>
            Loading...
          </Typography>
          <ImageComponent 
            src={'/assets/gearloading.gif'} 
            alt={'loading cog'}       
            height={26} 
            width={26} 
          />
        </ContentWrapper>
      :
        <ContentWrapper>
          <ButtonComponent 
            variant='outlined' 
            onClick={handleSignInClick}
            className={`normal-case bg-blue-500 text-white font-semibold`}
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