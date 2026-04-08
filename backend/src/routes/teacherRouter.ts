import { FastifyInstance } from "fastify";
import { TeacherController } from "../controllers/teacherController";
import { authorize } from "../middlewares/authorize";
import { authenticate } from "../middlewares/authenticate";

const teacherController = new TeacherController();

export function teacherRouter(app: FastifyInstance){

    app.put("/profile/:id", {preHandler: [authenticate, authorize("TEACHER")]}, (request, reply) => teacherController.updateProfile(request, reply));

}