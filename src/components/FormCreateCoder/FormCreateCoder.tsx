"use client";
import {GroupInput, Button} from "@/components"
import { ICoder } from "@/models";
import { useState } from "react";

interface IFormCreateCoderProps{
    title:string,
}
export default function FormCreateCoder({title}: IFormCreateCoderProps):React.ReactNode{

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

    const handleCreate = ():void =>{
        console.log(formData);
    }
    return(
        <form>
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
        </form>
    )
}