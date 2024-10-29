import MaxWContainer from "@/components/ui/MaxWContainer";
import getUserData from "@/lib/actions/getUserData";
import UserWorkingSpaceListCards from "@/components/dashboard-components/UserWorkingSpaceListCards";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const UserData = await getUserData(params.id);

  return (
    <MaxWContainer className="mt-14 mx-5">
      <h1 className="w-full text-center text-3xl font-semibold text-brand_primary">
        Good evening, {UserData?.name}
      </h1>
      <div className="w-full flex flex-col justify-center items-start gap-2 my-14 drop-shadow-lg">
        <p className="text-sm text-start font-extrabold text-brand_fourthary/50">
          Your working space list
        </p>
        <UserWorkingSpaceListCards UserId={UserData?.id} />
      </div>
    </MaxWContainer>
  );
}
