import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/userController";

const userController = new UserController();

export async function userRouter(app: FastifyInstance){

    app.post("/teacher", (req, reply) => userController.createTeacher(req, reply));
    app.post("/student", (req, reply) => userController.createStudent(req, reply));

}