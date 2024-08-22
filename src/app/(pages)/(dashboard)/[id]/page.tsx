import { redirect } from 'next/navigation'
import getUserSession from '@/lib/actions/getUserSession';
export default async function page({params}:any) {
    const session = await getUserSession()
  if(!session){
    redirect(`/login`)
  }else{
  return (
    <div className="mt-24 text-2xl">{params.id}</div>
  )
}
}
