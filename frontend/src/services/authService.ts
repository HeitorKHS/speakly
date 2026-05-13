import { api } from "./api";
import { RegisterStudentSchema, LoginSchema, RegisterTeacherSchema } from "@/schemas/authSchema";

export async function registerStudent(data: RegisterStudentSchema){
    const response = await api.post("/register/student", data);
    return response.data;
}

export async function registerTeacher(data: RegisterTeacherSchema){
    const response = await api.post("/register/teacher", data);
    return response.data;
}

export async function login(data: LoginSchema){
    const response = await api.post("/login", data);
    return response.data;
}

export async function logout(){
    await api.post("/logout");
}

export async function getMe(){
    const response = await api.get("/me");
    return response.data;
}