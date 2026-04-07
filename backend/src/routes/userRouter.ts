import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/userController";

const userController = new UserController();

export async function userRouter(app: FastifyInstance){

    app.post("/register/teacher", (request, reply) => userController.createTeacher(request, reply));
    app.post("/register/student", (request, reply) => userController.createStudent(request, reply));
    app.post("/login", (request, reply) => userController.login(request, reply));

}