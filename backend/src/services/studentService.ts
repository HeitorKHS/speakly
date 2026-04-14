import { UpdateStudentSchema } from "../schemas/studentSchema";
import { StudentRepository } from "../repositories/studentRepository";
import { TeacherRepository } from "../repositories/teacherRepository";

const studentRepository = new StudentRepository();
const teacherRepository = new TeacherRepository();

export class StudentService{

    async update(studentProfileId: string, data: UpdateStudentSchema){

        return await studentRepository.update(studentProfileId, data);

    }

    async get(studentProfileId: string){

        return await studentRepository.findById(studentProfileId);

    }

    async addTeacherToFavorite(studentProfileId: string, teacherProfileId: string){

        const teacher = await teacherRepository.findById(teacherProfileId);

        if(!teacher){
            throw new Error("Professor não encontrado");
        }

        const savedTeacher = await studentRepository.findSavedTeacher(studentProfileId, teacherProfileId);

        if(savedTeacher){
            throw new Error("Professor já está na lista");
        }

        return await studentRepository.addTeacherToFavorite(studentProfileId, teacherProfileId);

    }

    async removeTeacherFromFavorite(studentProfileId: string, teacherProfileId: string){

        const savedTeacher = await studentRepository.findSavedTeacher(studentProfileId, teacherProfileId);

        if(!savedTeacher){
            throw new Error("Professor não encontrado na lista");
        }

        return await studentRepository.removeTeacherFromFavorite(studentProfileId, teacherProfileId);

    }

    async getFavorites(studentProfileId: string){

        return await studentRepository.getFavorites(studentProfileId);

    }

}