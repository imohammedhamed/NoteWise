import Image from 'next/image'
import imgsrc from "../../../public/NoteWise-logo.svg"
interface WelcomeBanProps{
  Welcome_to?: String
}
export default function WelcomeBan({Welcome_to}:WelcomeBanProps) {
  return (
    //this for the login and signup card
    <div className=' w-full flex flex-col justify-center items-center pb-10'>
      <Image src={imgsrc} alt="NoteWise Logo" priority width={60} height={60} /> 
    <h1 className=' text-3xl lg:text-4xl md:text-4xl font-bold text-brand_primary pt-5'>{Welcome_to} to <span className='bg-gradient-to-r from-brand_fourthary/5 to-brand_primary/30 rounded-xl bg-clip-content'>NoteWise</span></h1>
    </div>
  )
}
