import { SectionCoders } from "@/components";
import { coderController } from "@/controllers";
import { ICoder } from "@/models";

const useCoderController = coderController;
export default async function CodersView(){
    const data: ICoder[] | {message:string, error:unknown} = await useCoderController.findAll();
    if("message" in data){
        return null;
    }
    return(
        <SectionCoders data={data}/>
    )
}