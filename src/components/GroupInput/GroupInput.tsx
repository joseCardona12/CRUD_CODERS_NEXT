import {Input} from "@/components";

interface IGroupInput{
    label:string,
    type:string,
    value:string | undefined,
    name:string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void
}
export default function GroupInput({label,type,value,name,onChange}: IGroupInput):React.ReactNode{
    return(
        <div className="group-input">
            <label htmlFor={name}>{label}</label>
            <Input type={type} value={value} name={name} onChange={onChange} />
        </div>
    )
}