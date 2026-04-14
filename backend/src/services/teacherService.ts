import { TeacherRepository } from "../repositories/teacherRepository";
import { UpdateTeacherSchema, WeeklyAvailabilitySchema } from "../schemas/teacherSchema";

const teacherRepository = new TeacherRepository();

export class TeacherService{

    async update(teacherProfileId: string, data: UpdateTeacherSchema){

        return await teacherRepository.update(teacherProfileId, data);

    }

    async get(teacherProfileId:string){

        return await teacherRepository.findById(teacherProfileId);

    }

    async createWeeklyAvailability(teacherProfileId: string, data: WeeklyAvailabilitySchema){

        return await teacherRepository.createWeeklyAvailability(teacherProfileId, data);

    }

    async getWeeklyAvailability(teacherProfileId: string){
    
        return await teacherRepository.getWeeklyAvailability(teacherProfileId);
    
    }

}