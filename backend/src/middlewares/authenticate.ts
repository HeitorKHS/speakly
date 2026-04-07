import { FastifyRequest, FastifyReply } from "fastify";

export async function authenticate(request: FastifyRequest, reply: FastifyReply){

    try {
        
        //Verifica se o JWT é válido, decodifica e adiciona as informações em req.user
        await request.jwtVerify();

    } catch(error:any) {
        
        return reply.status(401).send({ message: "Não autorizado" });

    }

}