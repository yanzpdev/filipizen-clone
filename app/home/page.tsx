"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Panel from '@/components/io/Panel';
import { AnimatePresence, motion } from 'framer-motion';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Sidebar from './Sidebar';
import MiniSidebar from './MiniSidebar';
import { GrCircleQuestion } from 'react-icons/gr';
import { IoCheckboxSharp } from "react-icons/io5";


const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showMiniMenu, setShowMiniMenu] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const session = true;

  if (session) {
    return (
      <Panel className="w-full overflow-hidden h-screen relative flex items-start bg-[#f6f8fc]">
        <Panel className="hidden flex-col xl:flex w-fit h-screen bg-[#eaf1fb]">
          <button 
            className='p-[22px] pb-[26px]'
            onClick={() => setShowMiniMenu((prev) => !prev)}
          >
            <GiHamburgerMenu size={22} className="text-[#5f6368] -mt-1" />
          </button>
          {[...Array(3).map((_, index) => index)].map((_, index) => (
            <button 
              key={index}
              className='mt-[16px] px-4 relative'
              onClick={() => setShowMiniMenu((prev) => !prev)}
            >
              <div 
                className='hover:bg-slate-300 duration-300 hover:rounded-full p-2'
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <IoCheckboxSharp size={22} className="text-[#5f6368] mx-auto" />
              </div>
              <Panel className='text-xs'>Item {index + 1}</Panel>
              {hoveredIndex === index && (
                <Panel className="absolute left-[100%] -top-10 w-44 h-80 bg-white shadow-xl p-4 rounded-lg">
                {/* Triangle */}
                <Panel className="absolute -left-2 top-[59px] -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-white"></Panel>
                <p>Item {index + 1} pop up</p>
              </Panel>
              )}
            </button>
          ))}
        </Panel>
  
        <AnimatePresence>
          {showMenu && <Sidebar setShowMenu={setShowMenu} showMenu={showMenu} />}
        </AnimatePresence>
  
        <Panel className="flex flex-col h-full w-full px-2 xl:px-4">
          <Panel className="flex items-center justify-between w-full">
            <Link 
              href={`/`}
              className="hidden xl:block w-[219px]"
            >
              <Image
                src="/assets/filipizen.svg"
                alt="Logo"
                width={170}
                height={170}
              />
            </Link>
  
            {/* Search Bar */}
            <Panel className="flex items-center justify-between xl:ml-2.5 py-2 w-full xl:w-[84%]">
              <Panel className="rounded-full w-full xl:w-[61%] bg-[#eaf1fb] p-2.5 py-3">
                <Panel className="flex items-center gap-3 ml-3">
                  {/* Mobile Menu Button */}
                  <button
                    className="xl:hidden text-[#505252] -mt-0.5"
                    onClick={() => setShowMenu((prev) => !prev)}
                  >
                    <GiHamburgerMenu size={20} />
                  </button>
                  <FaMagnifyingGlass size={20} className="text-[#757677] hidden xl:block" />
                  <Panel className='flex items-center justify-between w-full'>
                    <input
                      className="text-[#757677] font-extralight bg-transparent w-[90%]"
                      placeholder="Search"
                    />
                    <Panel className="xl:hidden h-10 w-10 border-2 border-black rounded-full flex items-center justify-center p-[1px]">
                      <Panel className="bg-blue-500 h-full w-full block rounded-full" />
                    </Panel>
                  </Panel>
                  
                </Panel>
              </Panel>
              <Panel className='hidden xl:flex items-center justify-between gap-3'>
                <button
                  className={`w-fit mb-2 rounded-full m-auto hover:bg-slate-300 p-1.5 duration-300`}
                >
                  <GrCircleQuestion size={20} className='w-6 h-6 text-[#5f6368]' />
                </button>
                <button
                  className={`w-fit mb-2 rounded-full m-auto hover:bg-slate-300 p-1.5 duration-300`}
                >
                  <svg 
                    className="Xy" 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24"
                    fill='#5f6368'
                    stroke='#5f6368'
                    strokeWidth={0.1}
                  >
                    <path d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z" />
                    <circle cx="12" cy="12" r="3.5" />
                  </svg>
                </button>
                <Panel className="hidden xl:flex h-10 w-10 border-2 border-black rounded-full items-center justify-center p-[1px]">
                  <Panel className="bg-blue-500 h-full w-full block rounded-full" />
                </Panel>
              </Panel>
  
            </Panel>
          </Panel>
          <Panel className="w-full h-[90vh] 2xl:h-[99%] flex justify-between">
            <MiniSidebar showMenu={showMiniMenu} />
  
            <Panel className="h-full xl:hidden w-full">
              <Panel className="w-full h-full bg-white rounded-[18px] px-5" />
            </Panel>
  
            <AnimatePresence>
              <motion.div
                className="ml-3 h-[90vh] 2xl:h-[99%] hidden xl:block"
                initial={{ width: showMiniMenu ? '84%' : '100%' }}
                animate={{ width: showMiniMenu ? '84%' : '100%' }}
                exit={{ width: showMiniMenu ? '84%' : '100%' }}
                transition={{ duration: 0.15, ease: 'easeInOut' }}
              >
                <Panel className="w-full h-full bg-white rounded-[18px] px-5" />
              </motion.div>
            </AnimatePresence>
          </Panel>
        </Panel>
      </Panel>
    )
  }

  else {
    return (
      <Panel className={`w-screen h-screen flex items-center justify-center`}>
        <Panel className='flex flex-col items-center justify-center gap-y-5'>
          <Image
            src={`/assets/filipizen.svg`} 
            alt={`Filipizen Logo`} 
            width={250} 
            height={250} 
            priority
            className="w-auto h-[70px]"
          />
          <Panel>
            Please
            <Link 
              href={'/login'}
              className='font-semibold hover:underline underline-offset-2'
            >
              &nbsp;sign in&nbsp;
            </Link>
            to continue
          </Panel>
        </Panel>
      </Panel>
    )
  }
}

export default HomePage;