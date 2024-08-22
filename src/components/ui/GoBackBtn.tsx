import Link from "next/link";
import { FaRegCircleLeft } from "react-icons/fa6";

export default function GoBackBtn() {
  return (
    //This for the login signup pages
            <Link href="/" className='absolute transition-all flex justify-center items-center gap-2 lg:top-10 md:top-10 top-5 left-5 lg:left-60 py-2 px-3 border border-solid border-LightPurple/10 rounded-xl text-sm font-bold text-DarkPurple hover:bg-gradient-to-r from-LightPurple/5 to-Purple700/20 hover:scale-105'>
              <FaRegCircleLeft className=" size-4 text-DarkPurple" />
              Go Back
            </Link>
  )
}