import { UpdateStudentSchema } from "../schemas/studentSchema";
import { StudentRepository } from "../repositories/studentRepository";

const studentRepository = new StudentRepository();

export class StudentService{

    async updateProfile(studentId: string, data: UpdateStudentSchema){
        return await studentRepository.updateProfile(studentId, data);
    }

    async savedTeacher(studentProfileId: string, teacherProfileId: string){
        return await studentRepository.saveTeacher(studentProfileId, teacherProfileId);
    }

    async removeSavedTeacher(studentProfileId: string, teacherProfileId: string){
        return await studentRepository.removeSaveTeacher(studentProfileId, teacherProfileId);
    }

    async getSavedTeacher(studentProfileId: string){
        return await studentRepository.getSavedTeacher(studentProfileId);
    }

}