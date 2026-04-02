import Fastify from "fastify";
import fastifyCors from "@fastify/cors";

export const app = Fastify({ logger: true });

//Só permite requisições ao meu backend vindas do endereço 3000
app.register(fastifyCors, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});