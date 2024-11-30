import Link from "next/link";
import { FaRegCircleLeft } from "react-icons/fa6";

export default function GoBackBtn() {
  return (
    <Link 
      href="/" 
      className='
        absolute
        flex items-center gap-2
        text-xs sm:text-sm
        py-1.5 sm:py-2
        px-2 sm:px-3
        top-3 sm:top-5 lg:top-10
        left-3 sm:left-5 lg:left-60
        border border-solid border-LightPurple/10 
        rounded-lg sm:rounded-xl
        font-semibold sm:font-bold
        text-brand_primary
        transition-all duration-200
        hover:bg-gradient-to-r from-brand_tertiary/5 to-brand_primary/20 
        hover:scale-105
        active:scale-95
      '
    >
      <FaRegCircleLeft className="size-3 sm:size-4 text-DarkNeutral" />
      Go Back
    </Link>
  )
}
