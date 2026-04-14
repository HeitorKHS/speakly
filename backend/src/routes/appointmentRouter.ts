import { FastifyInstance } from "fastify";
import { AppointmentController } from "../controllers/appointmentController";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const appointmentController = new AppointmentController();

export function appointmentRouter(app: FastifyInstance){

    //Apenas aluno pode criar
    app.post("/:teacherId", {preHandler: [authenticate, authorize("STUDENT")]}, (request, reply) => appointmentController.create(request, reply));
    
    //Professor e aluno podem cancelar
    app.patch("/:id/cancel", {preHandler: [authenticate]}, (request, reply) => appointmentController.cancel(request, reply));

    //Informação do agendamento
    app.get("/:id", {preHandler: [authenticate]}, (request, reply) => appointmentController.getById(request, reply));

    //Agenda do professor
    app.get("/teacher", {preHandler: [authenticate, authorize("TEACHER")]}, (request, reply) => appointmentController.getByTeacher(request, reply));

    //Agenda do aluno
    app.get("/student", {preHandler: [authenticate, authorize("STUDENT")]}, (request, reply) => appointmentController.getByStudent(request, reply));

}