import { TeacherRepository } from "../repositories/teacherRepository";
import { UpdateTeacherSchema, WeeklyAvailabilitySchema, AvailabilityOverrideSchema } from "../schemas/teacherSchema";

const teacherRepository = new TeacherRepository();

export class TeacherService{

    async updateProfile(teacherProfileId: string, data: UpdateTeacherSchema){
        return await teacherRepository.updateProfile(teacherProfileId, data);
    }

    async weeklyAvailability(teacherProfileId: string, data: WeeklyAvailabilitySchema){
        return await teacherRepository.weeklyAvailability(teacherProfileId, data);
    }

    async addAvailabilityOverride(teacherProfileId: string, data: AvailabilityOverrideSchema){
        return await teacherRepository.addAvailabilityOverride(teacherProfileId, data);
    }

    async deleteAvailabilityOverride(teacherProfileId: string, id: string){
        return await teacherRepository.deleteAvailabilityOverride(teacherProfileId, id);
    }

    async getAvailabilityOverride(teacherProfileId: string){
        return await teacherRepository.getAvailabilityOverride(teacherProfileId);
    }

}