import { testimonials } from "../../lib/data"
import MaxWContainer from "../ui/MaxWContainer"
import Section from "../ui/Section"
import SectionHeading from "./SectionHeading"
import { FaQuoteLeft } from "react-icons/fa6";
import { FaQuoteRight } from "react-icons/fa6";

export default function Testimonials() {
  return (
    <Section sectionId="testimonials">
        <MaxWContainer className=" relative">
            <span className=" absolute top-32 -left-24 -rotate-12 text-Purple700/50 blur-md -z-20">
                <FaQuoteLeft className="size-80"/>
            </span>
            <SectionHeading
            SectionTitle = "Testimonials"
            SectionSubTitle="What our users have been saying."
            />
            <div className=" container lg:grid lg:grid-cols-3 flex py-5 overflow-x-auto  gap-5">
                {
                    testimonials.map(item => {
                        return(
                            <div key={item.id} className={` lg:w-96 flex flex-col flex-shrink-0 w-80 border border-solid border-LightPurple rounded-xl p-4 bg-${item.Color}`}>
                                {/* <h3 className="pb-2 text-LightPurple text-sm font-semibold">{item.Title}</h3> */}
                                <p className="text-DarkPurple text-base font-medium ">{`"${item.Body}"`}</p>
                            </div>
                        )
                    })
                }
            </div>
        </MaxWContainer>
    </Section>
  )
}
