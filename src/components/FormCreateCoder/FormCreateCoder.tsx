"use client";
import {GroupInput, Button, inputAlert, Loading} from "@/components"
import { coderController } from "@/controllers";
import { ICoder } from "@/models";
import { useState } from "react";
import { useRouter } from "next/navigation";


const useCoderController = coderController;

interface IFormCreateCoderProps{
    title:string,
}

export default function FormCreateCoder({title}: IFormCreateCoderProps):React.ReactNode{
    const router = useRouter();
    const [loading,setLoading] = useState<boolean>(false); 

    const initialFormData:Partial<ICoder> = {
        name: "",
        avatar: ""
    }
    const [formData, setFormData] = useState<Partial<ICoder>>(initialFormData);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const handleCreate = async():Promise<void> =>{
        if(!formData.name || !formData.avatar){
            inputAlert("Is necesary all params for create coder", "error");
            return;
        }
        setLoading(true);
        const coderCreated = await useCoderController.add(formData);
        if("message" in coderCreated){
            inputAlert("Upss. There is an error", "error");
            console.log(`${coderCreated.message} Error: ${coderCreated.error}`);
            return;
        }
        setFormData(initialFormData);
        inputAlert("Coder created", "success");
    }

    const handleBackHome = ():void =>{
        setLoading(true);
        router.push("/coders");
    }
    return(
        <>
        {loading ? <Loading /> : null}
        <form onSubmit={(e) => e.preventDefault()}>
            <h2>{title}</h2>
            <GroupInput 
            label="Name" 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={(e) => handleChange(e)} />

            <GroupInput 
            label="Avatar" 
            type="text" 
            name="avatar" 
            value={formData.avatar} 
            onChange={(e) => handleChange(e)} />
            <Button onClick={handleCreate} text="Create coder" />
            <Button onClick={handleBackHome} text="BackHome" />
        </form>
        </>
    )
}