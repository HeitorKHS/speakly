import { FastifyRequest, FastifyReply } from "fastify";
import { updateTeacherSchema, weeklyAvailabilitySchema } from "../schemas/teacherSchema";
import { TeacherService } from "../services/teacherService";

{/*
    Código de erro
    200 - Operação realizada com sucesso
    400 - Dados inválidos (erro do Zod)
    500 - Erro no servidor
*/}

const teacherService = new TeacherService();

export class TeacherController{

    async update(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const { profileId } = request.user as {profileId: string};
            const body = updateTeacherSchema.parse(request.body);
            const teacher = await teacherService.update(profileId, body);
            return reply.status(200).send(teacher);

        } catch(error:any) {
            
            if(error?.issues){
                return reply.status(400).send({ message: error?.issues });
            }

            return reply.status(500).send({ message: "Erro no Servidor" });

        }

    }

    async get(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const { profileId } = request.user as {profileId: string};
            const teacher = await teacherService.get(profileId);
            return reply.status(200).send(teacher);

        } catch(error:any) {
            
            if(error?.issues){
                return reply.status(400).send({ message: error?.issues });
            }

            return reply.status(500).send({ message: "Erro no servidor" });

        }

    }

    async createWeeklyAvailability(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const { profileId } = request.user as {profileId: string};
            const body = weeklyAvailabilitySchema.parse(request.body);
            const weeklyAvailability = await teacherService.createWeeklyAvailability(profileId, body);
            return reply.status(200).send(weeklyAvailability);

        } catch(error:any) {
            
            if(error?.issues){
                return reply.status(400).send({ message: error?.issues });
            }

            return reply.status(500).send({ message: "Erro no servidor" });

        }

    }

    async getWeeklyAvailability(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const { profileId } = request.user as {profileId: string};
            const weeklyAvailability = await teacherService.getWeeklyAvailability(profileId);
            return reply.status(200).send(weeklyAvailability);

        } catch(error:any) {
            
            if(error?.issues){
                return reply.status(400).send({ message: error?.issues });
            }

            return reply.status(500).send({ message: "Erro no servidor" });

        }

    }

}