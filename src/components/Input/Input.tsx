
interface IInputProps{
    type:string,
    value:string | undefined,
    name:string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void
}
export default function Input({type,value,name,onChange}: IInputProps):React.ReactNode{
    return(
        <input type={type} name={name} value={value} onChange={onChange} />
    )
}