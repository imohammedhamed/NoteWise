interface SectionHeadingProps {
    SectionTitle:string,
    SectionSubTitle:string,
}
export default function SectionHeading({SectionTitle,SectionSubTitle}:SectionHeadingProps) {
  return (
    <div className=" flex justify-center items-center flex-col pb-20 w-full text-center">
        <h1 className=" py-2 lg:text-5xl text-3xl text-DarkPurple font-semibold">{SectionTitle}</h1>
        <h2 className=" lg:text-base text-xs text-DarkPurple/50 font-bold lg:w-2/4 container ">{SectionSubTitle}</h2>
    </div>
  )
}
