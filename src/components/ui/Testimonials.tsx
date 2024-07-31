import { testimonials } from "@/lib/data"
import MaxWContainer from "./MaxWContainer"
import Section from "./Section"
import SectionHeading from "./SectionHeading"
export default function Testimonials() {
  return (
    <Section sectionId="testimonials">
        <MaxWContainer>
            <SectionHeading
            SectionTitle = "Testimonials"
            SectionSubTitle="What our users have been saying."
            />
            <div className=" grid lg:grid-cols-3 grid-cols-1 gap-5">
                {
                    testimonials.map(item => {
                        return(
                            <div key={item.id} className={` container  border border-solid border-LightPurple rounded-xl p-4 bg-${item.Color}`}>
                                <h3 className="pb-2 text-LightPurple text-sm font-semibold">{item.Title}</h3>
                                <p className="text-DarkPurple text-base ">{item.Body}</p>
                            </div>
                        )
                    })
                }
            </div>
        </MaxWContainer>
    </Section>
  )
}
