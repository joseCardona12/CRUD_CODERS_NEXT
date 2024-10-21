import { ICoder } from "@/models";
import { HttpClientUtil } from "@/utils";

export default class CoderService {
    private httpClientUtil: HttpClientUtil;
    
    constructor(){
        this.httpClientUtil = new HttpClientUtil();
    }

    async findAll():Promise<ICoder[] | {message: string, error:unknown}>{
        try{
            const coders = this.httpClientUtil.get<ICoder[]>("coders");
            return coders;
        }catch(error:unknown){
            return ({message: "Error with the findAll http", error: error});
        }
    }
    async destroy(coder_id:string):Promise<ICoder | {message:string, error:unknown}>{
        if(!coder_id){
            return ({message: "Coder id is required", error: new Error("Coder id is required")});
        }
        try{
            const coder = this.httpClientUtil.delete<ICoder>("coders", coder_id);
            return coder;
        }catch(error:unknown){
            return ({message: "Error with the destroy http", error: error});
        }
    }

    async update(coder_id:string, coder:Partial<ICoder>): Promise<ICoder | {message: string, error:unknown}>{
        if(!coder_id){
            return ({message: "Coder id is required", error: new Error("Coder id is required")});
        }
        try{
            const coderUpdated = this.httpClientUtil.put<ICoder>("coders", coder_id, coder);
            return coderUpdated;
        }catch(error:unknown){
            return ({message: "Error with the update http", error: error});
        }
    }
}