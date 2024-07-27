import { NavLinks } from "@/lib/data"
import Link from "next/link"
import { Button } from "./button"
export default function Navbar() {
  return (
    <header className=' fixed top-0 w-full z-50 p-3 bg-Bgwhite/70 backdrop-blur border-b border-b-LightPurple/10'>
      <div className=' container mx-auto flex justify-between items-center'>
        <div className=" flex justify-center items-center">
          <Link href="/" className=" text-3xl font-bold text-DarkPurple pr-5"> <span className="text-Purple700">N</span>oteWise</Link>
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
        <Button className=" hidden lg:block"><Link href="/login" className=" text-sm font-semibold">Get Started for Free</Link></Button>
      </div>
    </header>
  )
}
