import { TeacherRepository } from "../repositories/teacherRepository";
import { UpdateTeacherSchema, WeeklyAvailabilitySchema } from "../schemas/teacherSchema";

const teacherRepository = new TeacherRepository();

export class TeacherService{

    async updateProfile(teacherId: string, data: UpdateTeacherSchema){
        return await teacherRepository.updateProfile(teacherId, data);
    }

    async weeklyAvailability(teacherId: string, data: WeeklyAvailabilitySchema){
        return await teacherRepository.weeklyAvailability(teacherId, data);
    }

}