import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../services/authService";
import { createTeacherSchema, createStudentSchema, loginSchema } from "../schemas/authSchema";

{/*
    Código de erro
    200 - Operação realizada com sucesso
    201 - Criado com sucesso
    400 - Dados inválidos (erro do Zod)
    404 - Não encontrado
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
                profileId: user.teacherProfile?.id ?? user.studentProfile?.id,
                role: user.role,
            });

            //"token" é o nome do token
            //token é os dados do token
            //httpOnly não permite que o javascript acesse esse cookie
            //secure cookies só é enviado através de conexões https 
            //sameTime controla se o cookie é enviado em requisições vindas de outros sites
            //path define em quais URLs do seu site esse cookie estará disponível
            return reply.setCookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                path: "/",
            }).status(200).send({
                id: user.id,
                role: user.role,
                name: user.studentProfile?.name ?? user.teacherProfile?.name,
                avatarUrl: user.studentProfile?.avatarUrl ?? user.teacherProfile?.avatarUrl,
            });

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

    async getMe(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const { sub } = request.user as {sub: string};
            const user = await authService.getMe(sub);
            return reply.status(200).send({
                id: user.id,
                role: user.role,
                name: user.studentProfile?.name ?? user.teacherProfile?.name,
                avatarUrl: user.studentProfile?.avatarUrl ?? user.teacherProfile?.avatarUrl,
            });

        } catch(error:any) {
            
            if(error.message === "Usuário não encontrado"){
                return reply.status(404).send({ message: error.message });
            }

            return reply.status(500).send({ message: "Erro no servidor" });

        }

    }

    async logout(request: FastifyRequest, reply: FastifyReply){

        try {
            
            return reply.clearCookie("token", { path: "/" }).send({ ok: true });// remove cookie httpOnly

        } catch(error:any) {
            
            return reply.status(500).send({ message: "Erro no servidor" });

        }

    }

}