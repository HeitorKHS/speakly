import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/authController";
import { authenticate } from "../middlewares/authenticate";

const authController = new AuthController();

export async function authRouter(app: FastifyInstance){

    app.post("/register/teacher", (request, reply) => authController.createTeacher(request, reply));
    app.post("/register/student", (request, reply) => authController.createStudent(request, reply));
    app.post("/login", (request, reply) => authController.login(request, reply));

    app.get("/me", {preHandler: [authenticate]} , (request, reply) => authController.getMe(request, reply));
    app.post("/logout", {preHandler: [authenticate]}, (request, reply) => authController.logout(request, reply));

}