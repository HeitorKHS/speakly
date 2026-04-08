import { FastifyRequest, FastifyReply } from "fastify";
import { updateTeacherSchema } from "../schemas/teacherSchema";
import { TeacherService } from "../services/teacherService";

{/*
    Código de erro
    200 - Operação realizada com sucesso
    400 - Dados inválidos (erro do Zod)
    500 - Erro no servidor
*/}

const teacherService = new TeacherService();

export class TeacherController{

    async updateProfile(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const { id } = request.params as {id: string};
            const body = updateTeacherSchema.parse(request.body);
            const teacher = await teacherService.updateProfile(id, body);
            return reply.status(200).send(teacher);

        } catch(error:any) {
            
            if(error?.issues){
                return reply.status(400).send({ message: error?.issues });
            }

            return reply.status(500).send({ message: "Erro do servidor interno." });

        }

    }

}