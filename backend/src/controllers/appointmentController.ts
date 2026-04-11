import { FastifyRequest, FastifyReply } from "fastify";
import { AppointmentService } from "../services/appointmentService";
import { createAppointmentSchema, updateAppointmentSchema } from "../schemas/appointmentSchema";

{/*
    Código de erro
    200 - Operação realizada com sucesso
    201 - Criado com sucesso
    400 - Dados inválidos (erro do Zod)
    404 - Dados já criado
    409 - E-mail já em uso
    500 - Erro no servidor
*/}

const appointmentService = new AppointmentService();

export class AppointmentController{

    async create(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const { profileId } = request.user as {profileId: string};
            const { id } = request.params as {id: string};
            const body = createAppointmentSchema.parse(request.body);
            const appointment = await appointmentService.create(id, profileId, body);
            return reply.status(201).send(appointment);

        } catch(error:any) {
            
            if(error.message === "O agendamento deve ser feito com pelo menos 1 dia de antecedência"){
                return reply.status(400).send({ message: error.message });
            }
            
            if(error.message === "Horário não disponível"){
                return reply.status(404).send({ message: error.message });
            }

            if(error.message === "Horário já ocupado"){
                return reply.status(404).send({ message: error.message });
            }
            
            if(error?.issues){
                return reply.status(400).send({ message: error?.issues });
            }

            return reply.status(500).send({ message: "Erro no Servidor" });

        }

    }

    async getById(request: FastifyRequest, reply: FastifyReply){
        
        try {
            
            const { id } = request.params as {id: string};
            const appointment = await appointmentService.getById(id);
            return reply.status(200).send(appointment);

        } catch(error:any) {
            
            return reply.status(500).send({ message: "Erro no Servidor" });
            
        }

    }

    async cancel(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const { id } = request.params as {id: string};
            const appointment = await appointmentService.cancel(id);
            return reply.status(200).send(appointment);

        } catch(error:any) {

            return reply.status(500).send({ message: "Erro no Servidor" });
            
        }

    }

    async findByTeacher(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const { profileId } = request.user as {profileId: string};
            const appointment = await appointmentService.findByTeacher(profileId);
            return reply.status(200).send(appointment);

        } catch(error:any) {
            
            return reply.status(500).send({ message: "Erro no Servidor" });
            
        }

    }

    async findByStudent(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const { profileId } = request.user as {profileId: string};
            const appointment = await appointmentService.findByStudent(profileId);
            return reply.status(200).send(appointment);

        } catch(error:any) {

            return reply.status(500).send({ message: "Erro no Servidor" });
            
        }

    }

    async update(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const { id } = request.params as {id: string};
            const body = updateAppointmentSchema.parse(request.body);
            const appointment = await appointmentService.update(id, body);
            return reply.status(200).send(appointment);

        } catch(error:any) {
            
            if(error?.issues){
                return reply.status(400).send({ message: error?.issues });
            }

            return reply.status(500).send({ message: "Erro no Servidor" });
            
        }

    }

}