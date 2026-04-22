import { FastifyRequest, FastifyReply } from "fastify";
import { LanguageService } from "../services/languageService";

const languageService = new LanguageService();

export class LanguageController{

    async get(request: FastifyRequest, reply: FastifyReply){

        try {
            
            const languages = await languageService.get();
            return reply.status(200).send(languages);

        } catch(error:any) {
            
            return reply.status(500).send({ message: "Erro no Servidor" });

        }

    }

}