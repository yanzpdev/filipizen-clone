import React, { useEffect, useRef, useState, useCallback } from 'react';
import { IoCheckboxSharp } from "react-icons/io5";
import { MdChevronLeft } from "react-icons/md";
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { HiCog6Tooth } from "react-icons/hi2";
import { GrCircleQuestion } from "react-icons/gr";

type SidebarProps = {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setShowMenu, showMenu }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  // const handleClickOutside = (event: MouseEvent) => {
  //   if (ref.current && !ref.current.contains(event.target as Node)) {
  //     setShowMenu(false);
  //   }
  // };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  }, [setShowMenu]);

  const handleSubItemClick = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) ? prev.filter(item => item !== index) : [...prev, index] 
    );
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu, handleClickOutside]);

  return (
    <div className="xl:hidden fixed h-screen bg-[#00000088] w-screen z-50">
      <motion.div 
        ref={ref} 
        className="w-9/12 md:w-1/2 bg-white px-3 fixed left-0 h-full shadow-md overflow-y-scroll"
        initial={{ x: -400 }}
        animate={{ x: 0 }}
        exit={{ x: -400 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className='flex items-center justify-between border-b py-5'>
          <Image 
            src="/assets/filipizen.svg"
            alt="Logo"
            width={120}
            height={120}
            className=''
          />
        </div>
        <ul className='flex flex-col bg-white'>
          {[...Array(7)].map((_, index) => (
            <li 
              key={index}
              className='overflow-hidden bg-white'
            >
              {index % 2 === 0 ? 
                <button
                  className={`py-3 px-5 ${index === 0 ? 'mt-2' : ''} flex items-center w-full justify-between mb-2 rounded-full`}
                  onClick={() => handleSubItemClick(index)}
                >
                  <span className='flex items-center gap-5 w-full'>
                    <IoCheckboxSharp size={20} />
                    <span>Item {index + 1}</span>
                  </span>
                  <MdChevronLeft  
                    size={20}
                    className={`${expandedItems.includes(index) ? '-rotate-90' : ''} duration-300`}
                  />
                </button>
              :
                <Link
                  href='#'
                  className={`py-3 px-5 ${index === 0 ? 'mt-2' : ''} flex items-center w-full justify-between mb-2 rounded-full`}
                >
                  <span className='flex items-center gap-5 w-full'>
                    <IoCheckboxSharp size={20} />
                    <span>Item {index + 1}</span>
                  </span>
                </Link> 
              }
              
              <AnimatePresence>
                {expandedItems.includes(index) && (
                  <motion.ul 
                    className='flex flex-col ml-10'
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut'}}
                  >
                    {[...Array(3)].map((_, subIndex) => (
                      <li 
                        key={subIndex}
                        className='py-3 px-5 flex items-center w-full justify-between mb-2 rounded-full'
                      >
                        <Link 
                          href={`#`}
                          className='w-full'
                        >
                          <span className='flex items-center gap-5 w-full'>
                            <IoCheckboxSharp size={20} />
                            <span>Sub Item {subIndex + 1}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
        
          <li className='overflow-hidden bg-white border-t'>
            <button
              className={`py-3 px-5 flex items-center w-full justify-between mb-2 rounded-full`}
            >
              <span className='flex items-center gap-5 w-full'>
                <HiCog6Tooth size={20} />
                <span>Settings</span>
              </span>
            </button>
          </li>

          <li className='overflow-hidden bg-white'>
            <button
              className={`py-3 px-5 flex items-center w-full justify-between mb-2 rounded-full`}
            >
              <span className='flex items-center gap-5 w-full'>
                <GrCircleQuestion size={20} />
                <span>Help & feedback</span>
              </span>
            </button>
          </li>
        </ul>
      </motion.div>
    </div>
  )
}

export default Sidebar;