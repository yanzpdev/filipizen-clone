'use client';
import Link from 'next/link';
import ImageComponent from '../ui/ImageComponent';
import ContentWrapper from '../ui/ContentWrapper';
import ButtonComponent from '../ui/ButtonComponent';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

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
  hidePartnerOptions?: boolean;
}

const Header:React.FC<HeaderProps> = ({
  navbarStyles, 
  extraStyle, 
  src, 
  height, 
  width, 
  title, 
  userName, 
  page, 
  data, 
  headerSelect,
  hidePartnerOptions
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string | undefined >(userName);

  const fallBackSrc = '/assets/'
  
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
        <Link href={data === undefined ? `/` : `/partners/${data?.group?.name}_${data?.name}`} className='flex items-center justify-center text-center'>
          <Image   
            src={src}
            alt='logo'
            width={width || 24}
            height={height || 24}
          />
          <p className={`${page === 'profile2' ? 'text-[#DDDDDD] text-[21.3333px] ml-[5px]' : ' text-white text-[20px] ml-[10px] pt-[0px]'} font-bold`}>{title}</p>
        </Link>
        {page === 'partner' && !hidePartnerOptions &&
          <ContentWrapper className='ml-10 text-[#f5f5f5] flex items-center relative justify-center gap-10 text-[20px] font-bold'>
            <Link href={`/partners/${data?.group?.name}_${data?.name}`} className={`px-3 py-1 rounded-md duration-200 relative top-[9px] h-14 ${headerSelect === 'services' ? 'bg-[#f5f5f5] text-[#2c3e50]' : 'hover:bg-[#f5f5f5] hover:text-[#2c3e50]'} `}>Services</Link>
            <Link href={`/partners/${data?.group?.name}_${data?.name}/data`} className={`px-3 py-1 rounded-md duration-200 relative top-[9px] h-14 ${headerSelect === 'data' ? 'bg-[#f5f5f5] text-[#2c3e50]' : 'hover:bg-[#f5f5f5] hover:text-[#2c3e50]'}`}>Data</Link>
          </ContentWrapper>
        }
      </ContentWrapper>
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
    </ContentWrapper>
  )
}

export default Header