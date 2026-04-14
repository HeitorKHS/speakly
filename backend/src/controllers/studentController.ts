import { FastifyRequest, FastifyReply } from "fastify";
import { StudentService } from "../services/studentService";
import { updateStudentSchema } from "../schemas/studentSchema";

{/*
    Código de erro
    200 - Operação realizada com sucesso
    400 - Dados inválidos (erro do Zod)
    404 - Dados não encontrado
    409 - Conflito de dados
    500 - Erro no servidor
*/}

const studentService = new StudentService();

export class StudentController{

    async update(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const { profileId } = request.user as {profileId: string};
            const body = updateStudentSchema.parse(request.body);
            const student = await studentService.update(profileId, body);
            return reply.status(200).send(student);

        } catch(error:any) {
            
            if(error?.issues){
                return reply.status(400).send({ message: error?.issues });
            }

            return reply.status(500).send({ message: "Erro no servidor" });

        }

    }

    async get(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const { profileId } = request.user as {profileId: string};
            const student = await studentService.get(profileId);
            return reply.status(200).send(student);

        } catch(error:any) {
            
            if(error?.issues){
                return reply.status(400).send({ message: error?.issues });
            }

            return reply.status(500).send({ message: "Erro no servidor" });

        }

    }

    async addTeacherToFavorite(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const { profileId } = request.user as {profileId: string};
            const { id } = request.params as {id: string};
            const savedTeacherList = await studentService.addTeacherToFavorite(profileId, id); 
            return reply.status(200).send(savedTeacherList);

        } catch(error:any) {
            
            if(error.message === "Professor não encontrado"){
                return reply.status(404).send({ message: "Professor não encontrado" });
            }

            if (error.message === "Professor já está na lista") {
                return reply.status(409).send({ message: error.message })
            }

            if(error?.issues){
                return reply.status(400).send({ message: error?.issues });
            }

            return reply.status(500).send({ message: "Erro no servidor" });

        }

    }

    async removeTeacherFromFavorite(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const { profileId } = request.user as {profileId: string};
            const { id } = request.params as {id: string};
            const savedTeacherList = await studentService.removeTeacherFromFavorite(profileId, id);
            return reply.status(200).send(savedTeacherList);

        } catch(error:any) {
            
            if(error.message === "ProProfessor não encontrado na lista"){
                return reply.status(404).send({ message: "Professor não encontrado na lista" });
            }

            if(error?.issues){
                return reply.status(400).send({ message: error?.issues });
            }

            return reply.status(500).send({ message: "Erro no servidor" });

        }

    }

    async getFavorites(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const { profileId } = request.user as {profileId: string};
            const savedTeacherList = await studentService.getFavorites(profileId);
            return reply.status(200).send(savedTeacherList);

        } catch(error:any) {
            
            return reply.status(500).send({ message: "Erro no servidor" });

        }

    }

}