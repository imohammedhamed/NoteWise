import { HowToStartSteps } from "@/lib/data"
import SectionHeading from "./SectionHeading"
import MaxWContainer from "./MaxWContainer"
export default function HowToStartSection() {
  return (
    <section id="How_To_Start">
        <MaxWContainer>
            <SectionHeading
            SectionTitle="How To Start ?"
            SectionSubTitle="it has never been easier"
            />
            <div className=" grid grid-cols-3 gap-10 w-full">
                {
                    HowToStartSteps.map(step =>{
                        return(
                            <div key={step.id} className=" container">
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
    </section>
  )
}
