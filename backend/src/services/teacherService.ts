import { TeacherRepository } from "../repositories/teacherRepository";
import { UpdateTeacherSchema } from "../schemas/teacherSchema";

const teacherRepository = new TeacherRepository();

export class TeacherService{

    async updateProfile(teacherId: string, data: UpdateTeacherSchema){
        return await teacherRepository.updateProfile(teacherId, data);
    }

}