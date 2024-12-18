'use client';
import Link from 'next/link';
import Panel from '../io/Panel';
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Partner } from '@/types/types';

interface HeaderProps {
  className: string
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
  className, 
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
    <header className={className}>
      <Panel className='flex pt-[2px] gap-5 items-center justify-center text-white'>
        <Link href={data === undefined ? `/` : `/partners/${data?.group?.name}_${data?.name}`} className='flex items-center justify-center text-center'>
          <img   
            src={src}
            alt='logo'
            width={width || 24}
            height={height || 24}
          />
          <p className={`${page === 'profile2' ? 'text-[#DDDDDD] text-[21.3333px] ml-[5px]' : ' text-white text-xs lg:text-[20px] ml-[10px] pt-[0px]'} font-bold`}>{title}</p>
        </Link>
        {page === 'partner' && !hidePartnerOptions &&
          <nav className='lg:ml-10 text-[#f5f5f5] flex items-center relative justify-center gap-2 lg:gap-10 text-xs lg:text-[20px] font-bold'>
            <Link href={`/partners/${data?.group?.name}_${data?.name}`} className={`px-3 py-3 rounded-md duration-200 relative top-[9px] h-14 ${headerSelect === 'services' ? 'bg-[#f5f5f5] text-[#2c3e50]' : 'hover:bg-[#f5f5f5] hover:text-[#2c3e50]'} `}>Services</Link>
            <Link href={`/partners/${data?.group?.name}_${data?.name}/data`} className={`px-3 py-3 rounded-md duration-200 relative top-[9px] h-14 ${headerSelect === 'data' ? 'bg-[#f5f5f5] text-[#2c3e50]' : 'hover:bg-[#f5f5f5] hover:text-[#2c3e50]'}`}>Data</Link>
          </nav>
        }
      </Panel>
      <nav>
        <Link
          className={`normal-case text-xs lg:text-sm ${page === 'partner' ? 'text-white' : ' text-slate-700 px-2'} font-semibold hover:bg-transparent hover:underline`}        
          href="/login"
        >
          Sign In
        </Link>
      </nav>
    </header>
  )
}

export default Header