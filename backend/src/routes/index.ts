import { FastifyInstance } from "fastify";
import { authRouter } from "./authRouter";
import { teacherRouter } from "./teacherRouter";
import { studentRouter } from "./studentRouter";

export async function routes(app: FastifyInstance){
    app.register(authRouter);
    app.register(teacherRouter, {prefix: "/teacher"});
    app.register(studentRouter, {prefix: "/student"});
}