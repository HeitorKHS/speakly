import { FastifyRequest, FastifyReply } from "fastify";
import { StudentService } from "../services/studentService";
import { updateStudentSchema } from "../schemas/studentSchema";

{/*
    Código de erro
    200 - Operação realizada com sucesso
    400 - Dados inválidos (erro do Zod)
    500 - Erro no servidor
*/}

const studentService = new StudentService();

export class StudentController{

    async updateProfile(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const { id } = request.params as {id: string};
            const body = updateStudentSchema.parse(request.body);
            const student = await studentService.updateProfile(id, body);
            return reply.status(200).send(student);

        } catch(error:any) {
            
            if(error?.issues){
                return reply.status(400).send({ message: error?.issues });
            }

            return reply.status(500).send({ message: "Erro no servidor" });

        }

    }

}