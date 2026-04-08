import { FastifyInstance } from "fastify";
import { StudentController } from "../controllers/studentController";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const studentController = new StudentController();

export function studentRouter(app: FastifyInstance){

    //Perfil do aluno
    app.put("/profile", {preHandler: [authenticate, authorize("STUDENT")]}, (request, reply) => studentController.updateProfile(request, reply));
    
    //Lista de professores salvos do aluno
    app.post("/saved/:id", {preHandler: [authenticate, authorize("STUDENT")]}, (request, reply) => studentController.savedTeacher(request, reply));
    app.delete("/saved/:id", {preHandler: [authenticate, authorize("STUDENT")]}, (request, reply) => studentController.removeSavedTeacher(request, reply));
    app.get("/saved", {preHandler: [authenticate, authorize("STUDENT")]}, (request, reply) => studentController.getSavedTeacher(request, reply));

}