import { FastifyInstance } from "fastify";
import { authRouter } from "./authRouter";
import { teacherRouter } from "./teacherRouter";

export async function routes(app: FastifyInstance){
    app.register(authRouter);
    app.register(teacherRouter, {prefix: "/teacher"});
}