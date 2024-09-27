"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FaArrowTurnUp } from "react-icons/fa6";
import { FaRegComments } from "react-icons/fa6";
import {useChat} from "ai/react"
import { useRef,useEffect } from "react"
interface ChatNoteProps{
    UserNoteTitle:string
    UserNoteBody:string
    UserNoteId:string|undefined
    WorkingSpaceSlug:string|undefined|null
    UserId:string|undefined|null
}
export default function ChatNote({UserNoteTitle,UserNoteBody,UserNoteId,WorkingSpaceSlug,UserId}:ChatNoteProps) {
  const {messages,input,handleInputChange,handleSubmit}=useChat()
  const renderResponse = ()=>{
    return(
      <div>
          {messages.map(message => (
            <div key={message.id}>
              <div>{message.role}</div>
              <div>{message.content}</div>
            </div>
        ))}
      </div>
    )
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className=" fixed bottom-5 right-5 lg:bottom-10 lg:right-10 border-Purple300 rounded-full"><FaRegComments className=" lg:size-8 size-6 text-Purple700"/></Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm mb-10 mt-5">
          <DrawerHeader className=" *:w-full *:text-center space-y-2">
            <DrawerTitle className=" text-3xl text-Red700">! Opps</DrawerTitle>
            <DrawerDescription className=" text-sm font-bold text-LightPurple"> {`We're currently fixing the chatbot; there's a problem with the OpenAI API.`}</DrawerDescription>
            {/* <DrawerDescription className=" text-xs font-bold text-LightPurple">Our advanced AI allows you to interact with your notes naturally Ask questions, get summaries,</DrawerDescription> */}
          </DrawerHeader>
          <div className=" flex flex-col flex-1">
            <div className="flex-grow min-h-[250px] overflow-y-auto" >
              {renderResponse()}
            </div>
                <form onSubmit={handleSubmit} className=" relative space-y-8">
                    <Input type="text" disabled={true} onChange={handleInputChange} value={input} placeholder="Hi there! How can I assist you today?" className=" w-full" />
                  <button type="submit" className=" absolute -top-6 right-3 p-1 rounded-md bg-Purple200 cursor-pointer hover:opacity-50"><FaArrowTurnUp className=" text-Purple700"/></button>
                </form>
            </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
