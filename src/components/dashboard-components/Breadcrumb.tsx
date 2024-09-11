"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
interface BreadcrumbDemoProps{
  UserId:string|undefined|null
  UserNoteSlug:string|undefined
  WorkingSpaceSlug:string|undefined
  UserNoteTitle:string
  WorkingSpaceName:string
  UserNoteTableName:string
}
export function BreadcrumbDemo({UserId,UserNoteSlug,WorkingSpaceSlug,UserNoteTitle,WorkingSpaceName,UserNoteTableName}:BreadcrumbDemoProps) {
 // add aslug 
  return (
    <div className="bg-Bgwhite py-2 px-5">
      <div className=' w-full flex justify-start items-center flex-grow gap-2 *:lg:text-sm *:text-xs *:text-DarkPurple/50 *:font-bold'>
        <Link href={`/${UserId}`} className='hover:text-Purple700 hover:underline'>Home</Link>
        <span>/</span>
        <Link href={`/${UserId}/${WorkingSpaceSlug}`} className='hover:text-Purple700 hover:underline lg:block hidden'>{WorkingSpaceName}</Link>
        <span>/</span>
        <Link href={`/${UserId}/${WorkingSpaceSlug}`} className='hover:text-Purple700 hover:underline'>{UserNoteTableName}</Link>
        <span>/</span>
        <p>{UserNoteTitle}</p>
      </div>
    </div>
  );
}

export default BreadcrumbDemo;