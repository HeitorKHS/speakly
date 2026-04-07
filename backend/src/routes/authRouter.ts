import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/authController";

const authController = new AuthController();

export async function authRouter(app: FastifyInstance){

    app.post("/register/teacher", (request, reply) => authController.createTeacher(request, reply));
    app.post("/register/student", (request, reply) => authController.createStudent(request, reply));
    app.post("/login", (request, reply) => authController.login(request, reply));

}