import { FastifyInstance } from "fastify";
import { LanguageController } from "../controllers/languageController";

const languageController = new LanguageController();

export function languageRouter(app: FastifyInstance){

    //Pega todos os idiomas registrado
    app.get("/", (request, reply) => languageController.get(request, reply));

}