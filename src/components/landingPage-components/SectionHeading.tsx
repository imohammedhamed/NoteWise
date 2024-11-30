interface SectionHeadingProps {
    SectionTitle:string,
    SectionSubTitle:string,
}
export default function SectionHeading({SectionTitle,SectionSubTitle}:SectionHeadingProps) {
  return (
    <div className=" flex justify-center items-center flex-col lg:pb-20 pb-10 w-full text-center">
        <h1 className=" py-2 lg:text-6xl text-4xl text-brand_primary font-semibold">{SectionTitle}</h1>
        <h2 className=" lg:text-base text-sm text-brand_primary/50 font-bold lg:w-2/4 container ">{SectionSubTitle}</h2>
    </div>
  )
}
