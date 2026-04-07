import { UserRepository } from "../repositories/userRepository";
import { CreateStudentSchema, CreateTeacherSchema, LoginSchema } from "../schemas/userSchema";
import bcrypt from "bcryptjs";

const userRepository = new UserRepository();

export class UserService{

    async createTeacher(data: CreateTeacherSchema){

        const userExists = await userRepository.findUserByEmail(data.email);

        if(userExists){
            throw new Error ("E-mail já em uso");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await userRepository.createTeacher(data, hashedPassword);
        return user.id;

    }

    async createStudent(data: CreateStudentSchema){

        const userExists = await userRepository.findUserByEmail(data.email);

        if(userExists){
            throw new Error ("E-mail já em uso");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await userRepository.createStudent(data, hashedPassword);
        return user.id;

    }

    async login(data: LoginSchema){

        const user = await userRepository.findUserByEmail(data.email);

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