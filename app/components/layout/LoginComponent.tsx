'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image'
import { IoMdSearch } from 'react-icons/io'; 
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { signIn, signOut, useSession } from 'next-auth/react';
import { MdLabel } from 'react-icons/md';
import { redirect } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

interface Partner {
  id: number;
  title: string;
  subtype: string;
  group: { title: string };
}

interface LoginComponentProps {
  memberData: Partner[];
}

const LoginComponent: React.FC<LoginComponentProps> = ({ memberData }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [disable, setDisable] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const [partnerLink, setPartnerLink] = useState<string>('');


  const filteredPartners = searchText
    ? memberData.filter((partner: Partner) => new RegExp(`^${searchText}`, 'i').test(partner.title))
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


  console.log(partnerLink);

  const handleSignOut = () => {
    signOut();
  }

  const handleSignIn = (provider: string) => {
    signIn(provider);
  }

  const handleClick = (param: any) => {
    setSearchText(param.title + (param.subtype !== 'province' ? `, ${param.group.title}` : ''));
    setPartnerLink('/partners/' + param.clusterid + '_' + param.name);
    setDropdownVisible(false); 
  }

  const redirectToPartner = () => {
    redirect(partnerLink);
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
    <div className='h-[60%] w-screen mt-[64px] flex flex-col items-center'>
      <div className='h-[50px]'></div>
      <Image
        src='/assets/filipizen.svg'
        alt='Filipizen Logo'
        width={220}
        height={60.66}
      />
      {status === 'authenticated' && 
        <>
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
                   className='h-full w-full static search-input text-[.970rem] rounded-full rounded-l-none'
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
         <div className='hover:bg-[#e8e2f2]'>

         </div>
         <Button
           variant='contained'
           className={`mt-[32px] text-[14px] font-medium ${disable ? 'text-black bg-none' : ''} text-[#6200EE] hover:bg-[#eeeaf4] p-[8px] rounded-md tracking-[.10em]`}
           style={{
             boxShadow: 'none',
             backgroundColor: isClicked ? '#e3d7f4' : ''
           }}
           onClick={redirectToPartner}
           disabled={!partnerLink}
         >
           <Typography variant="body1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '' }}>
             GO TO SERVICES
           </Typography>
         </Button>
        </>
      }
      
        {status !== 'authenticated' &&
          <div className='flex flex-col gap-3 mt-[32px]'>
            <p className='text-center'>Sign in with</p>
            <div className=' flex gap-3'>
              <Button
                variant='contained'
                className='hover:text-white flex gap-2 items-center justify-center rounded-full'
                style={{ color: 'black', textTransform: 'none' }}
                onClick={() => handleSignIn('google')}
              >
                <FcGoogle size={20} /> <p>Google</p>
              </Button>
              <Button
                variant='contained'
                className='hover:text-white flex gap-2 items-center justify-center rounded-full'
                style={{ color: 'black', textTransform: 'none' }}
                onClick={() => handleSignIn('facebook')}
              >
                <FaFacebook size={20} className='text-[#0863f7]' /> <p>Facebook</p>
              </Button>
            </div>
          </div>

        }
      
      <Button
        variant='contained'
        className={`mt-[32px] text-[14px] font-medium text-[#018786] hover:bg-[#e6f1f1] p-[8px] rounded-md tracking-[.10em]`}
        style={{ boxShadow: 'none' }}
      >
        <Typography variant="body1" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', fontWeight: '' }}>
          VIEW ALL PARTNERS
        </Typography>
      </Button>

      
      <div className='h-[30px]'></div>
      {status === 'authenticated' &&
        <div className='mt-[32px] flex flex-col items-center'>
          <div>YOU ARE AUTHENTICATED</div>
          <Button
            variant='contained'
            className='hover:text-white'
            style={{ color: 'black' }}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      }

    </div>
  )
}

export default LoginComponent;
