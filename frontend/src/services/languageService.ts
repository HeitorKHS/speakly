import { api } from "./api";

export interface Language{
    id: string,
    name: string,
    code: string,
};

export async function getLanguage():Promise<Language[]>{
    const response = await api.get("/language");
    return response.data;
}