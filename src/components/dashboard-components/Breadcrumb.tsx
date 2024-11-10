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
    <div className=" w-full bg-brand_secondary py-2 px-5">
      <div className=' w-full flex justify-start items-center flex-grow gap-2 *:lg:text-sm *:text-xs *:text-brand_primary/50 *:font-bold'>
        <Link href={`/${UserId}`} className='hover:text-brand_fourthary hover:underline'>Home</Link>
        <span>/</span>
        <Link href={`/${UserId}/${WorkingSpaceSlug}`} className='hover:text-brand_fourthary hover:underline lg:block hidden'>{WorkingSpaceName}</Link>
        <span>/</span>
        <Link href={`/${UserId}/${WorkingSpaceSlug}`} className='hover:text-brand_fourthary hover:underline'>{UserNoteTableName}</Link>
        <span>/</span>
        <p>{UserNoteTitle}</p>
      </div>
    </div>
  );
}

export default BreadcrumbDemo;
