"use client";
import { HowToStartSteps } from "../../lib/data"
import SectionHeading from "./SectionHeading"
import MaxWContainer from "../ui/MaxWContainer"
import Section from "../ui/Section";

export default function HowToStartSection() {
  return (
        <Section sectionId ="How_To_Start">
        <MaxWContainer>
            <SectionHeading
            SectionTitle="How To Start ?"
            SectionSubTitle="it has never been easier"
            />
            <div className=" container grid lg:grid-cols-3 grid-cols-1 gap-10 w-full">
                {
                    HowToStartSteps.map(step =>{
                        return(
                            <div key={step.id} className=" flex justify-center items-start ">
                                <div className=" py-4 border-t border-brand_primary h-max w-72">
                                <span className=" font-bold text-xs text-brand_primary">{step.StepNum}</span>
                                <h3 className=" py-1 text-xl text-brand_primary font-semibold">{step.Title}</h3>
                                <p className=" text-base text-brand_primary/70 ">{step.Body}</p>
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
