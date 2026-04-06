import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/userService";
import { createTeacherSchema, createStudentSchema } from "../schemas/userSchema";

{/*
    Código de erro
    201 - Criado com sucesso
    400 - Dados inválidos (erro do Zod)
    409 - E-mail já em uso
    500 - Erro no servidor
*/}

const userService = new UserService();

export class UserController{

    async createTeacher(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const body = createTeacherSchema.parse(request.body);
            const user = await userService.createTeacher(body);
            return reply.status(201).send(user);

        } catch(error:any) {
            
            if(error.message === "E-mail já em uso"){
                return reply.status(409).send({ message: error.message });
            }

            if(error?.issues){
                return reply.status(400).send({ message: error?.issues });
            }

            return reply.status(500).send({ message: "Erro no servidor" });

        }

    }

    async createStudent(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const body = createStudentSchema.parse(request.body);
            const user = await userService.createStudent(body);
            return reply.status(201).send(user);

        } catch(error:any) {
            
            if(error.message === "E-mail já em uso"){
                return reply.status(409).send({ message: error.message });
            }

            if(error?.issues){
                return reply.status(400).send({ message: error?.issues });
            }

            return reply.status(500).send({ message: "Erro no servidor" });

        }

    }

}