import MaxWContainer from "./MaxWContainer"
import SectionHeading from "./SectionHeading"
import { aboutCard } from "@/lib/data"
import Section from "./Section"
export default function AboutSection() {
  return (
        <Section sectionId="about">
        <MaxWContainer>
            <SectionHeading
            SectionTitle = "About Us"
            SectionSubTitle="Dive deeper into how our AI-powered note-taking platform can revolutionize your productivity and idea management."
            />
            <div className=" grid lg:grid-cols-2 grid-cols-1 gap-5">
                {
                    aboutCard.map(item =>{
                        return(
                            <div key={item.id} className=" container flex justify-center items-center">
                                <div className=" p-4 bg-Purple50 border border-solid border-LightPurple rounded-xl lg:w-11/12 lg:h-32 h-max">
                                    <h3 className=" pb-2 text-lg text-DarkPurple font-semibold ">{item.Title}</h3>
                                    <p className=" text-base text-DarkPurple/50 font-medium">{item.Body}</p>
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
