import { AuthRepository } from "../repositories/authRepository";
import { CreateStudentSchema, CreateTeacherSchema, LoginSchema } from "../schemas/authSchema";
import bcrypt from "bcryptjs";

const authRepository = new AuthRepository();

export class AuthService{

    async createTeacher(data: CreateTeacherSchema){

        const userExists = await authRepository.findUserByEmail(data.email);

        if(userExists){
            throw new Error ("E-mail já em uso");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await authRepository.createTeacher(data, hashedPassword);
        return user.id;

    }

    async createStudent(data: CreateStudentSchema){

        const userExists = await authRepository.findUserByEmail(data.email);

        if(userExists){
            throw new Error ("E-mail já em uso");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await authRepository.createStudent(data, hashedPassword);
        return user.id;

    }

    async login(data: LoginSchema){

        const user = await authRepository.findUserByEmail(data.email);

        if(!user){
            throw new Error ("E-mail ou senha inválidos");
        }

        const validPassword = await bcrypt.compare(data.password, user.password);
        
        if(!validPassword){
            throw new Error ("E-mail ou senha inválidos");
        }

        return user;

    }

}