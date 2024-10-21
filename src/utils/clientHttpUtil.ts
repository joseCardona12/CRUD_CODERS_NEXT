import { ICoder } from "@/models";

const baseUrl:string = "https://671642e233bc2bfe40bd2552.mockapi.io/api/v1/";

export default class HttpClientUtil{
    private baseUrl: string; 

    constructor(baseUrlClient?:string){
        this.baseUrl = baseUrlClient || baseUrl;
    };

    async get<T>(url:string):Promise<T>{
        const headers = await this.getHeaders();
        const response = await fetch(`${this.baseUrl}/${url}`, {
            headers,
            method: "GET",
            cache: "no-store"
        });
        return await this.manageError(response);
    };

    async delete<T>(url:string, id: string):Promise<T>{
        const headers = await this.getHeaders();
        const response = await fetch(`${this.baseUrl}/${url}/${id}`, {
            headers,
            method: "DELETE",
            cache: "no-store"
        });
        return await this.manageError(response);
    }

    async put<T>(url:string, id:string, coder: Partial<ICoder>):Promise<T>{
        const {name, avatar} = coder;
        const headers = await this.getHeaders();
        const response = await fetch(`${this.baseUrl}/${url}/${id}`, {
            headers,
            method: "PUT",
            cache: "no-store",
            body: JSON.stringify({name,avatar})
        });
        return await this.manageError(response);
    }

    private async getHeaders():Promise<{}>{
        return {
            "Content-Type": "application/json"
        }
    };
    
    private async manageError(response: Response){
        if(!response.ok){
            const errorData = await response.json(); 
            throw new Error(errorData.message || "Upps. There is a error")
        };
        return await response.json();
    } 

}