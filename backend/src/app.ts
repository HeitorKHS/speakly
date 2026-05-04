import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { env } from "./env";

//import routes
import { routes } from "./routes";

export const app = Fastify({ logger: true });

//Ativa o suporte de cookies no Fastify
app.register(fastifyCookie);

//Só permite requisições ao meu backend vindas do endereço 3000
app.register(fastifyCors, {
    origin: "http://localhost:3000",
    credentials: true, //Permite que o navegador envie cookies e cabeçalhos de autenticação para o servidor
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: "token",
        signed: false, //O servidor confia apenas no que está escrito
    },
    sign: {
        expiresIn: "7d",
    },
});

//routes
app.register(routes);