import SheetSideBar from "@/components/dashboard-components/SheetSideBar";
import SideBar from "@/components/dashboard-components/SideBar";
import MaxWContainer from "@/components/ui/MaxWContainer";
import getUserSession from "@/lib/actions/getUserSession";
import { redirect } from "next/navigation";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getUserSession()
  if(!session){
    redirect(`/login`)
  }
  return (
    <div className=" flex lg:flex-row flex-col min-h-screen">
      <SideBar />
      <div className="flex-grow lg:ml-[19rem]">
        {children}
      </div>
    </div>
  );
}
