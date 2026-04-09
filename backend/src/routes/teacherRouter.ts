import { FastifyInstance } from "fastify";
import { TeacherController } from "../controllers/teacherController";
import { authorize } from "../middlewares/authorize";
import { authenticate } from "../middlewares/authenticate";

const teacherController = new TeacherController();

export function teacherRouter(app: FastifyInstance){

    //Perfil
    app.put("/profile", {preHandler: [authenticate, authorize("TEACHER")]}, (request, reply) => teacherController.updateProfile(request, reply));

    //Disponibilidade semanal do professor
    app.put("/availability", {preHandler: [authenticate, authorize("TEACHER")]}, (request, reply) => teacherController.weeklyAvailability(request, reply));

}