import { HowToStartSteps } from "@/lib/data"
import SectionHeading from "./SectionHeading"
import MaxWContainer from "./MaxWContainer"
import Section from "./Section";

export default function HowToStartSection() {
  return (
        <Section sectionId ="How_To_Start">
        <MaxWContainer>
            <SectionHeading
            SectionTitle="How To Start ?"
            SectionSubTitle="it has never been easier"
            />
            <div className=" grid lg:grid-cols-3 grid-cols-1 gap-10 w-full">
                {
                    HowToStartSteps.map(step =>{
                        return(
                            <div key={step.id} className=" container flex justify-center items-start ">
                                <div className=" py-4 border-t border-Purple700 h-max w-72">
                                <span className=" font-bold text-xs text-Purple700">{step.StepNum}</span>
                                <h3 className=" py-1 text-xl text-DarkPurple font-semibold">{step.Title}</h3>
                                <p className=" text-base text-DarkPurple/50 ">{step.Body}</p>
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
