import { api } from "./api";
import { Language } from "@/types";

export async function getLanguage():Promise<Language[]>{
    const response = await api.get("/language");
    return response.data;
}