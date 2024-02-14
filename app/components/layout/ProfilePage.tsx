'use client';
import { signOut } from 'next-auth/react'
import React from 'react'
import ContainerComponent from '../ui/ContainerComponent';

const ProfilePage = () => {
  return (
    <div className='flex'>
      <ContainerComponent
        className='h-screen bg-red-50'
        classes={{}}
        fixed={false}
        disableGutters={true}
      >

      </ContainerComponent>
      <ContainerComponent
        className='h-screen bg-blue-50'
        classes={{}}
        fixed={false}
        disableGutters={true}
      >
        
      </ContainerComponent>
    </div>
  )
}

export default ProfilePage