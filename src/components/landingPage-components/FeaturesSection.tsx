import MaxWContainer from "../ui/MaxWContainer"
import SectionHeading from "./SectionHeading"
import { features } from "@/lib/data"
import Section from "../ui/Section"
import Image from "next/image"
export default function FeaturesSection() {
  return (
        <Section sectionId="features" className=" bg-brand_primary/5">
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
                                <div className=" space-y-3 flex flex-col justify-start items-start p-5 bg-brand_secondary/70 backdrop-blur border border-solid border-brand_primary/50 rounded-xl w-full h-max lg:w-[800px] lg:h-36">
                                    <h3 className=" pb-2 text-lg text-brand_primary font-bold ">{item.Title}</h3>
                                    <p className=" text-base text-brand_primary/70 font-bold">{item.Body}</p>
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
