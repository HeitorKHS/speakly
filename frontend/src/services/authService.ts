import { api } from "./api";
import { RegisterStudentSchema } from "@/schemas/authSchema";

export async function registerStudent(data: RegisterStudentSchema){
    const response = await api.post("/register/student", data);
    return response.data;
}