import MaxWContainer from "../ui/MaxWContainer"
import { Button } from "../ui/button"
import Link from "next/link"
export default function SignUpToday() {
  return (
    <section className=" w-full py-20 mt-14 bg-gradient-to-b from-white to-Purple300">
        <MaxWContainer className=" flex justify-center items-center flex-col gap-10">
            <h3 className=" lg:text-3xl text-lg text-center bg-gradient-to-b from-Purple600 to-DarkPurple bg-clip-text text-transparent font-semibold ">Ready to Experience the Future of Note-Taking? <br /> Sign Up Today and Start Your Free Trial</h3>
            <Button><Link href="/signup" className="lg:text-base text-sm px-10">Sign Up</Link></Button>
        </MaxWContainer>
    </section>
  )
}
