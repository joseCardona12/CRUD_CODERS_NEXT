"use client";
import { ICoder } from "@/models"
import {Button, inputAlert, Loading} from "@/components";
import { coderController } from "@/controllers";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ITableProps{
    data: ICoder[]
}

const useCoderController = coderController;

export default function TableCoder({data}: ITableProps):React.ReactNode{
    const router = useRouter();
    const [editId, setEditId] = useState<string>("");
    const [loading,setLoading] = useState<boolean>(false);
    
    const intialFormData: Partial<ICoder> = {
        name: "",
        avatar: ""
    }
    const [formData, setFormData] = useState<Partial<ICoder>>(intialFormData);

    const handleUpdate = async(id:string):Promise<void> =>{
        setEditId(id);
        console.log(formData);
        if(!formData.name || !formData.avatar){
            inputAlert("Is necesary all params for update coder", "error");
            return;
        }
        setLoading(true);
        const coderUpdated = await useCoderController.update(id, formData);
        if("message" in coderUpdated){
            inputAlert("Upss. There is an error", "error");
            console.log(`${coderUpdated.message} Error: ${coderUpdated.error}`);
            return;
        }
        setEditId("");
        setFormData(intialFormData);
        router.refresh();
        inputAlert("Coder updated", "success");
        setLoading(false);
    }
    const handleDelete = async(id:string):Promise<void> =>{
        const coderDeleted = await useCoderController.destroy(id);
        router.refresh(); 
    }

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>):void =>{
        const {name,value} = event.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    return (
        <>
        {loading && <Loading />}
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
                        <td>{editId === coder.id 
                            ? 
                            <input type="text" value={formData.name} name="name" onChange={(e)=>handleChange(e)} /> 
                            : coder.name}
                        </td>
                        <td>{editId === coder.id 
                            ? 
                            <input type="text" value={formData.avatar} name="avatar" onChange={(e)=>handleChange(e)} /> 
                            : coder.avatar}
                        </td>
                        <td>
                            <Button text={editId === coder.id ? "Save" : "Edit"} onClick={()=>handleUpdate(coder.id)} id={coder.id} />
                            <Button text={"Delete"} onClick={()=>handleDelete(coder.id)} id={coder.id} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}