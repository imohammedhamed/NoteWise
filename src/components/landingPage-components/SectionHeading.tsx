interface SectionHeadingProps {
    SectionTitle: string,
    SectionSubTitle: string,
}

export default function SectionHeading({SectionTitle, SectionSubTitle}: SectionHeadingProps) {
  return (
    <div className="flex justify-center items-center flex-col w-full text-center
                    py-6 sm:py-8 md:py-12 lg:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                       font-semibold text-brand_primary
                       py-2 sm:py-3">
            {SectionTitle}
        </h1>
        <h2 className="text-xs sm:text-sm md:text-base lg:text-lg
                       font-bold text-brand_primary/50
                       w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%]">
            {SectionSubTitle}
        </h2>
    </div>
  )
}
