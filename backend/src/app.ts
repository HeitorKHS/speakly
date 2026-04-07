import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";

//import routes
import { routes } from "./routes";

export const app = Fastify({ logger: true });

//Só permite requisições ao meu backend vindas do endereço 3000
app.register(fastifyCors, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: "7d",
    },
});

//routes
app.register(routes);