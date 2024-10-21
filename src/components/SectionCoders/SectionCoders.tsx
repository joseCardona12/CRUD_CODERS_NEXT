"use client";
import {TableCoder, Button} from "@/components";
import { ICoder } from "@/models";
import { useRouter } from "next/navigation";

interface ISectionCodersProps{
    data: ICoder[],
}
export default function SectionCoders({data}: ISectionCodersProps){
    const router = useRouter();
    const handleClick = ():void =>{
        router.push("/coders/crear-coder");
    }
    return(
        <div className="content-coders">
            <TableCoder data={data} />
            <Button onClick={handleClick} text="Create" />
        </div>
    )
}