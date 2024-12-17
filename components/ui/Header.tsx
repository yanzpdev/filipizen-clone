'use client';
import Link from 'next/link';
import Panel from '../io/Panel';
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Partner } from '@/types/types';

interface HeaderProps {
  navbarStyles: string
  src: string
  height: number
  width: number
  title: string
  page?: string;
  data?: Partner;
  headerSelect?: string;
  hidePartnerOptions?: boolean;
}

const Header:React.FC<HeaderProps> = ({
  navbarStyles, 
  src, 
  height, 
  width, 
  title, 
  page, 
  data, 
  headerSelect,
  hidePartnerOptions
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    <Panel className={navbarStyles}>
      <Panel className='flex pt-[2px] gap-5 items-center justify-center text-white'>
        <Link href={data === undefined ? `/` : `/partners/${data?.group?.name}_${data?.name}`} className='flex items-center justify-center text-center'>
          <img   
            src={src}
            alt='logo'
            width={width || 24}
            height={height || 24}
          />
          <p className={`${page === 'profile2' ? 'text-[#DDDDDD] text-[21.3333px] ml-[5px]' : ' text-white text-[20px] ml-[10px] pt-[0px]'} font-bold`}>{title}</p>
        </Link>
        {page === 'partner' && !hidePartnerOptions &&
          <Panel className='ml-10 text-[#f5f5f5] flex items-center relative justify-center gap-10 text-[20px] font-bold'>
            <Link href={`/partners/${data?.group?.name}_${data?.name}`} className={`px-3 py-1 rounded-md duration-200 relative top-[9px] h-14 ${headerSelect === 'services' ? 'bg-[#f5f5f5] text-[#2c3e50]' : 'hover:bg-[#f5f5f5] hover:text-[#2c3e50]'} `}>Services</Link>
            <Link href={`/partners/${data?.group?.name}_${data?.name}/data`} className={`px-3 py-1 rounded-md duration-200 relative top-[9px] h-14 ${headerSelect === 'data' ? 'bg-[#f5f5f5] text-[#2c3e50]' : 'hover:bg-[#f5f5f5] hover:text-[#2c3e50]'}`}>Data</Link>
          </Panel>
        }
      </Panel>
      <Panel>
        <Link
          className={`normal-case text-sm ${page === 'partner' ? 'text-white' : ' text-slate-700 px-2'} font-semibold hover:bg-transparent hover:underline`}        
          href="/login"
        >
          Sign In
        </Link>
      </Panel>
    </Panel>
  )
}

export default Header