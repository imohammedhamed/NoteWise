import BlurEffect from "@/components/ui/BlurEffect"
export default function loading() {
  return (
    <div className=" relative flex flex-1 min-h-screen w-full">
        <div className=" flex justify-center items-center w-full">
        <span className="loading loading-infinity loading-lg text-Purple700"></span>
        {/* <BlurEffect className="top-10 left-10 w-32 h-[20rem] lg:h-[50rem]"/> */}
        </div>
    </div>
  )
}
//<span className="loading loading-infinity loading-md"></span>