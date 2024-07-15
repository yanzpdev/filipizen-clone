import { Roboto } from "next/font/google"
import Link from "next/link";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

interface FooterProps {
  inPartner?: boolean;
}

const Footer:React.FC<FooterProps> = ({inPartner}) => {
  const dateToday = new Date();
  let year = dateToday.getFullYear();
  return (
    <div className={`${roboto.className} w-full h-fit border-t-[3px] border-solid justify-between relative bottom-0 border-black bg-gray-200 rounded-b-md text-center text-[11.6px]`}>
      <p className='text-[#8b8b8b] py-[7px]'>@Copyright {year} <Link href={inPartner ? '/partners' : '/'} className="hover:underline">Filipizen</Link></p>
    </div>
  )
}

export default Footer