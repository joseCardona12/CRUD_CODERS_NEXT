import { ICoder } from "@/models";
import { CoderService } from "@/services";

class CoderController{
    private coderService: CoderService;

    constructor(){
        this.coderService = new CoderService();
    }
    async findAll():Promise<ICoder[] | {message: string, error:unknown}>{
        const coders = await this.coderService.findAll();
        return coders;
    }

    async destroy(coder_id:string):Promise<ICoder | {message: string, error:unknown}>{
        const coder = await this.coderService.destroy(coder_id);
        return coder;
    }
}

export default new CoderController();