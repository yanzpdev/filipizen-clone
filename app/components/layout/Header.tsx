import Link from 'next/link';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { getServerSession } from 'next-auth';
import ImageComponent from '../ui/ImageComponent';
import ContentWrapper from '../ui/ContentWrapper';

const Header = async({navbarStyles, src, height, width, title}: {navbarStyles: string, src: string, height: number, width: number, title: string}) => {
  // const session = await getServerSession();

  return (
    <ContentWrapper className={navbarStyles}>
      <Link href='/' className='flex items-center justify-center'>
        <ImageComponent 
          src={src}
          alt='filipizen logo'
          width={width || 24}
          height={height || 24}
          priority={true}
        />
        <p className='ml-[10px] text-white text-[20px] font-bold pt-[2px]'>{title}</p>
      </Link>

      {/* {session && session.user && 
        <IoMdArrowDropdownCircle className='text-slate-700 active:scale-95 duration-100' size={20}/>
      } */}
    </ContentWrapper>
  )
}

export default Header