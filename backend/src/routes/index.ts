import { FastifyInstance } from "fastify";
import { userRouter } from "./userRouter";

export async function routes(app: FastifyInstance){
    app.register(userRouter);
}