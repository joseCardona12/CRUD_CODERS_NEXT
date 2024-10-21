const baseUrl:string = "http://localhost:3000";

export default class HttpClient{
    private baseUrl: string; 

    constructor(baseUrl:string){
        this.baseUrl = baseUrl;
    }
}