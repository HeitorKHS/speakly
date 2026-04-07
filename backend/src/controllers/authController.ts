import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../services/authService";
import { createTeacherSchema, createStudentSchema, loginSchema } from "../schemas/authSchema";

{/*
    Código de erro
    200 - Operação realizada com sucesso
    201 - Criado com sucesso
    400 - Dados inválidos (erro do Zod)
    409 - E-mail já em uso
    500 - Erro no servidor
*/}

const authService = new AuthService();

export class AuthController{

    async createTeacher(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const body = createTeacherSchema.parse(request.body);
            const user = await authService.createTeacher(body);
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
            const user = await authService.createStudent(body);
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

    async login(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const body = loginSchema.parse(request.body);
            const user = await authService.login(body);
            const token = await reply.jwtSign({
                sub: user.id,
                role: user.role,
            });

            return reply.status(200).send(token);

        } catch(error:any) {
            
            if(error.message === "E-mail ou senha inválidos"){
                return reply.status(401).send({ message: error.message });
            }

            if(error?.issues){
                return reply.status(400).send({ message: error?.issues });
            }

            return reply.status(500).send({ message: "Erro no servidor" });

        }

    }

}