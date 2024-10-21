"use client";


interface IButtonProps{
    text:string,
    id?:string,
    onClick:(id?:string) =>void;
}

export default function Button({text,onClick,id}: IButtonProps){
    return(
        <button onClick={()=>onClick(id)}>{text}</button>
    )
}