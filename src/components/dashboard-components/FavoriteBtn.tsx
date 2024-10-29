"use client";
import { useState } from "react"
import { toast } from "sonner";
import { useRouter } from 'next/navigation'
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { cn } from "@/lib/utils";
interface FavoriteBtnProps{
    favorite:boolean|null
    workspaceId: string | undefined
    className?:string
    // UserId:string|undefined
}
export default function FavoriteBtn({favorite,workspaceId,className}:FavoriteBtnProps) {
    const [isFavorite, setIsFavorite] = useState(favorite);
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    async function handleRemoveFav(){
        if (!workspaceId) {
            toast.error("Workspace ID is missing.");
            return;
        }
        try {
            setLoading(true)
            const response = await fetch("/api/remove-favorite", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: workspaceId }),
            });

            if (response.ok) {
                setIsFavorite(false);
                toast.success("Removed from favorites!");
                router.refresh();
            } else {
                const data = await response.json();
                toast.error(data.message || "Failed to remove favorite.");
            }
        } catch (error) {
            console.error("Error removing favorite:", error);
            toast.error("An error occurred while removing the favorite.");
        }finally{
            setLoading(false)
        }
    }
    async function handleAddFav(){
        if (!workspaceId) {
            toast.error("Workspace ID is missing.");
            return;
        }
        try {
            setLoading(true)
            const response = await fetch("/api/add-favorite", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: workspaceId }),
            });

            if (response.ok) {
                setIsFavorite(true);
                toast.success("Added to favorites!");
                router.refresh();
            } else {
                const data = await response.json();
                toast.error(data.message || "Failed to add favorite.");
            }
        } catch (error) {
            console.error("Error adding favorite:", error);
            toast.error("An error occurred while adding the favorite.");
        }finally{
            setLoading(false)
        }
    }
    if(favorite){
        return <span>{loading?<FaStar className={cn("text-brand_primary/20",className)}/>:<FaStar onClick={handleRemoveFav} className={cn("text-brand_primary cursor-pointer transition-all hover:scale-125",className)}/>}</span>
    }else{
        return <span>{loading?<FaRegStar className={cn("text-brand_primary/20",className)}/>:<FaRegStar onClick={handleAddFav} className={cn("text-brand_primary cursor-pointer transition-all hover:scale-125",className)}/>}</span>
    }
}

