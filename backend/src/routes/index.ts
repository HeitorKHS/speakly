import { FastifyInstance } from "fastify";
import { authRouter } from "./authRouter";

export async function routes(app: FastifyInstance){
    app.register(authRouter);
}