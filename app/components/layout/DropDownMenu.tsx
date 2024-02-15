'use client';
import { Ref } from 'react'
import ButtonComponent from '../ui/ButtonComponent'
import { Typography } from '@mui/material'
import { signOut } from 'next-auth/react'
import ImageComponent from '../ui/ImageComponent'
import { useSession } from 'next-auth/react';

interface dropDownProps {
  buttonRef?: Ref<HTMLDivElement>;
  userName: string | any;
  image?: string | any;
  email?: string | any;
}
const DropDownMenu:React.FC<dropDownProps> = ({buttonRef, userName, image, email}) => {
  const {data: session, status} = useSession();
  return (
    <div 
      className='w-auto text-slate-700 p-6 border rounded-lg select-none bg-[#f5f5f5]'
      ref={buttonRef}
    >
      {status === 'loading' ?
        <ImageComponent 
          src={'/assets/gearloading.gif'} 
          alt={'User'}  
          width={70}
          height={70}            
          className='rounded-full self-center m-auto'
          priority
        />
      :
        <ImageComponent 
          src={image} 
          alt={'User'}  
          width={70}
          height={70}            
          className='rounded-full self-center m-auto'
          priority
        />
      }
      <Typography
        className='text-lg font-semibold text-center'
      >
        {userName}
      </Typography>
      <Typography
        className='text-xs text-center'
      >
        {email}
      </Typography>
      <ButtonComponent
        variant='contained'
        size='small'
        className='rounded-full w-full mt-6'
        href='/profile'
      >
        Profile
      </ButtonComponent>
      <ButtonComponent
        variant='contained'
        size='small'
        onClick={signOut}
        className='bg-red-500 rounded-full hover:bg-red-600 w-full mt-2'
      >
        Sign Out
      </ButtonComponent>
    </div> 
  )
}

export default DropDownMenu