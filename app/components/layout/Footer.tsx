import { Roboto } from "next/font/google"

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})
const Footer = () => {
  const dateToday = new Date();
  let year = dateToday.getFullYear();
  return (
    <div className={`${roboto.className} w-full h-fit border-t-[3px] border-solid justify-between relative bottom-0 border-black bg-gray-200 rounded-b-md text-center text-[11.6px]`}>
      <p className='text-[#8b8b8b] py-[7px]'>@Copyright {year} Filipizen</p>
    </div>
  )
}

export default Footer