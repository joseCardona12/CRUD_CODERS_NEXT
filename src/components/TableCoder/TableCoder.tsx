"use client";
import { ICoder } from "@/models"
import {Button} from "@/components";
import { coderController } from "@/controllers";
import { useRouter } from "next/navigation";

interface ITableProps{
    data: ICoder[]
}

const useCoderController = coderController;

export default function TableCoder({data}: ITableProps):React.ReactNode{
    const router = useRouter();

    const handleUpdate = (id:string):void =>{
        console.log(id);
    }
    const handleDelete = async(id:string):Promise<void> =>{
        const coderDeleted = await useCoderController.destroy(id);
        router.refresh(); 
    }
    return (
        <table>
            <thead>
                <tr>
                    <td>id</td>
                    <td>Name</td>
                    <td>Avatar</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                {data.map((coder:ICoder, index:number)=>(
                    <tr key={index}>
                        <td>{coder.id}</td>
                        <td>{coder.name}</td>
                        <td>{coder.avatar}</td>
                        <td>
                            <Button text={"Edit"} onClick={()=>handleUpdate(coder.id)} id={coder.id} />
                            <Button text={"Delete"} onClick={()=>handleDelete(coder.id)} id={coder.id} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}