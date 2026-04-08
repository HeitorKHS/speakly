import { FastifyInstance } from "fastify";
import { StudentController } from "../controllers/studentController";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const studentController = new StudentController();

export function studentRouter(app: FastifyInstance){

    app.put("/profile/:id", {preHandler: [authenticate, authorize("STUDENT")]}, (request, reply) => studentController.updateProfile(request, reply));

}