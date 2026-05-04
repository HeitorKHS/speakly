import { api } from "./api";
import { RegisterStudentSchema, LoginSchema } from "@/schemas/authSchema";

export async function registerStudent(data: RegisterStudentSchema){
    const response = await api.post("/register/student", data);
    return response.data;
}

export async function login(data: LoginSchema){
    const response = await api.post("/login", data);
    return response.data;
}