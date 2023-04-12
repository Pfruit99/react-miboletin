import axios from 'axios';
import { DocenteInterface } from '../interfaces';
export class Http {

    async get<T>(url: string): Promise<T>{
        const response = await axios.get<T>(url);
        return response.data;
    }

    async post<T>(url:string, body:T): Promise<T>{
        const response = await axios.post<T>(url,body);
        return response.data;
    }
}