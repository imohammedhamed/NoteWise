interface SectionHeadingProps {
    SectionTitle:string,
    SectionSubTitle:string,
}
export default function SectionHeading({SectionTitle,SectionSubTitle}:SectionHeadingProps) {
  return (
    <div className=" flex justify-center items-center flex-col py-20 w-full text-center">
        <h1 className=" py-2 text-4xl text-DarkPurple font-semibold">{SectionTitle}</h1>
        <h2 className=" lg:text-base text-xs text-DarkPurple/50 font-medium lg:w-1/3 ">{SectionSubTitle}</h2>
    </div>
  )
}
