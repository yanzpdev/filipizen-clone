'use client'
import React, { useEffect, useRef, useState } from 'react';
import { IoCheckboxSharp } from "react-icons/io5";
import { MdChevronLeft } from "react-icons/md";
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { HiCog6Tooth } from "react-icons/hi2";
import { GrCircleQuestion } from "react-icons/gr";

const MiniSidebar = ({showMenu}: {showMenu: boolean}) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const handleSubItemClick = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) ? prev.filter(item => item !== index) : [...prev, index] 
    );
  };
  return (
    <div className='overflow-y-auto overflow-x-hidden'>
      <AnimatePresence>
        {showMenu &&
          <motion.div
            className='hidden h-full xl:block'
            initial={{ width: 0, opacity: 0, x: -10 }}
            animate={{ width: '219px', opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: -10 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
          >
            <ul className='flex flex-col text-sm overflow-hidden'>
              {[...Array(7)].map((_, index) => (
                <li 
                  key={index}
                  className='overflow-hidden'
                >
                  {index % 2 === 0 ? 
                    <button
                      className={`p-3 ${index === 0 ? 'mt-2' : ''} flex items-center w-full justify-between mb-2 rounded-full`}
                      onClick={() => handleSubItemClick(index)}
                    >
                      <span className='flex items-center gap-5 w-full'>
                        <IoCheckboxSharp size={16} />
                        <span
                          className={`transition-all duration-300 ${
                            showMenu ? 'max-w-full' : 'max-w-0 overflow-hidden'
                          } whitespace-nowrap text-ellipsis`}
                        >
                          Item {index + 1}
                        </span>
                      </span>
                      <MdChevronLeft  
                        size={16}
                        className={`${expandedItems.includes(index) ? '-rotate-90' : ''} duration-300`}
                      />
                    </button>
                  :
                    <Link
                      href='#'
                      className={`p-3 ${index === 0 ? 'mt-2' : ''} flex items-center w-full justify-between mb-2 rounded-full`}
                    >
                      <span className='flex items-center gap-5 w-full'>
                        <IoCheckboxSharp size={16} />
                        <span
                          className={`transition-all duration-300 ${
                            showMenu ? 'max-w-full' : 'max-w-0 overflow-hidden'
                          } whitespace-nowrap text-ellipsis`}
                        >
                          Item {index + 1}
                        </span>
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
            
              <li className='overflow-hidden xl:hidden bg-white border-t'>
                <button
                  className={`py-3 px-5 flex items-center w-full justify-between mb-2 rounded-full`}
                >
                  <span className='flex items-center gap-5 w-full'>
                    <HiCog6Tooth size={20} />
                    <span>Settings</span>
                  </span>
                </button>
              </li>
    
              <li className='overflow-hidden xl:hidden bg-white'>
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
        }
        
      </AnimatePresence>
    </div>
  )
}

export default MiniSidebar