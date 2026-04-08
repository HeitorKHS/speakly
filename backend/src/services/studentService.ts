import { UpdateStudentSchema } from "../schemas/studentSchema";
import { StudentRepository } from "../repositories/studentRepository";

const studentRepository = new StudentRepository();

export class StudentService{

    async updateProfile(studentId: string, data: UpdateStudentSchema){
        return await studentRepository.updateProfile(studentId, data);
    }

}