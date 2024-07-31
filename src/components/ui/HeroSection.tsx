import { Button } from "./button"
import Link from "next/link"
import MaxWContainer from "./MaxWContainer"
import { ContainerScroll } from "./container-scroll-animation";
import Image from "next/image"
import heroImg from "../../../public/UserDashboard-Note.svg"
export default function HeroSection() {
  return (
    <section className=" mt-40 flex justify-center items-center w-full">
        <MaxWContainer className="*:text-center relative px-4">
        <h1 className=" lg:text-5xl text-2xl font-semibold pb-5">Take Notes to the Next Level with <br /> <span className=" border-b-[5px] border-Purple700">AI-Powered</span> Conversations</h1>
        <p className=" lg:text-xl text-base font-medium">Interact with Your Notes Like Never Before. <br /> Organize, Discuss, and Enhance Your Ideas Seamlessly.</p>
        <div className=" absolute top-10 left-10 -rotate-45 -z-50 w-32 h-[20rem] lg:h-[50rem] bg-Purple700 blur-[10rem] overflow-visible"></div>
        <span className=" w-full flex justify-center items-center pt-7  pb-20 *:text-base *:font-semibold">
        <Button className="mx-2"><Link href="/login" className="lg:text-base text-sm font-medium">Get Started for Free</Link></Button>
        <Button className="mx-2" variant="ghost"><Link href="/#about" className="lg:text-base text-sm font-medium">Learn More</Link></Button>
        </span>
        <Image src={heroImg} alt="hero img" priority quality={100} className=" p-5 rounded-xl bg-DarkPurple/10 backdrop-blur-xl "/>
        </MaxWContainer>
    </section>
  )
}
