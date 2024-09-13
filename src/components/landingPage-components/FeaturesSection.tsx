import MaxWContainer from "../ui/MaxWContainer"
import SectionHeading from "./SectionHeading"
import { features } from "@/lib/data"
import Section from "../ui/Section"
import Image from "next/image"
export default function FeaturesSection() {
  return (
        <Section sectionId="features">
        <MaxWContainer>
            <SectionHeading
            SectionTitle = "Features"
            SectionSubTitle="Dive deeper into how our AI-powered note-taking platform can revolutionize your productivity and idea management."
            />
            <div className=" container grid lg:grid-cols-2 grid-cols-1 gap-5">
                {
                    features.map(item =>{
                        return(
                            <div key={item.id} className=" w-full flex justify-center items-center">
                                <div className=" space-y-3 flex flex-col justify-center items-start p-6 bg-Purple50 border border-solid border-LightPurple rounded-xl w-full h-max lg:w-[800px] lg:h-36">
                                    <span className=" flex justify-center items-center gap-3">
                                    <Image src={item.imgSrc} alt="about img" width={35} height={35} className=" mb-1.5"/>
                                    <h3 className=" pb-2 text-lg text-DarkPurple font-bold ">{item.Title}</h3>
                                    </span>
                                    <p className=" text-base text-DarkPurple/50 font-bold">{item.Body}</p>
                                </div>
                            </div> 
                        )
                    })
                }
            </div>
        </MaxWContainer>
        </Section>
  )
}
