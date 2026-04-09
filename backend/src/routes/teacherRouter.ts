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

    //Alteração de disponibilidade do professor
    app.put("/override", {preHandler: [authenticate, authorize("TEACHER")]}, (request, reply) => teacherController.addAvailabilityOverride(request, reply));
    app.delete("/override/:id", {preHandler: [authenticate, authorize("TEACHER")]}, (request, reply) => teacherController.deleteAvailabilityOverride(request, reply));
    app.get("/override", {preHandler: [authenticate, authorize("TEACHER")]}, (request, reply) => teacherController.getAvailabilityOverride(request, reply));

}