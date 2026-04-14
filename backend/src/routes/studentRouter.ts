import { FastifyInstance } from "fastify";
import { StudentController } from "../controllers/studentController";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const studentController = new StudentController();

export function studentRouter(app: FastifyInstance){

    //Perfil do aluno
    app.put("/profile", {preHandler: [authenticate, authorize("STUDENT")]}, (request, reply) => studentController.update(request, reply));
    app.get("/profile", {preHandler: [authenticate, authorize("STUDENT")]}, (request, reply) => studentController.get(request, reply));

    //Lista de professores salvos do aluno
    app.post("/favorited/:id", {preHandler: [authenticate, authorize("STUDENT")]}, (request, reply) => studentController.addTeacherToFavorite(request, reply));
    app.delete("/favorited/:id", {preHandler: [authenticate, authorize("STUDENT")]}, (request, reply) => studentController.removeTeacherFromFavorite(request, reply));
    app.get("/favorited", {preHandler: [authenticate, authorize("STUDENT")]}, (request, reply) => studentController.getFavorites(request, reply));

}