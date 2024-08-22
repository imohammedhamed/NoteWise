import { NavLinks } from "../../lib/data"
import Link from "next/link"
import { Button } from "./button"
import Image from "next/image"
import imgsrc from "../../../public/NoteWise-logo.svg"
export default function Navbar() {
  return (
    <header className=' fixed top-0 w-full z-50 p-3 bg-Bgwhite/70 backdrop-blur border-b border-b-LightPurple/10'>
      <div className=' container mx-auto flex justify-between items-center'>
        <div className=" flex justify-center items-center">
          <Link href="/" className=" text-3xl font-bold text-DarkPurple pr-5"> <Image src={imgsrc} alt="NoteWise Logo" priority width={55} height={55} /> </Link>
          <ul className=" hidden lg:flex">
          {
            NavLinks.map((link,i)=>{
              return(
                <Link key={i} href={link.path} className="px-2 text-base hover:font-semibold transition ease-in-out duration-200">{link.Name}</Link>
              )
            })
          }
          </ul>
        </div>
        <Button><Link href="/login" className=" text-sm font-medium">Get Started for Free</Link></Button>
      </div>
    </header>
  )
}
