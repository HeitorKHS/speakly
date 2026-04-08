import { prisma } from "../libs/prisma";
import { UpdateStudentSchema } from "../schemas/studentSchema";

export class StudentRepository{

    async updateProfile(studentId: string, data: UpdateStudentSchema){

        return await prisma.studentProfile.update({
            where: {id: studentId},
            data: {
                ...(data.studentLanguageGoal !== undefined && {
                    studentLanguageGoal:{
                        deleteMany: {},
                        create: data.studentLanguageGoal.map(id => ({languageId: id})),
                    },
                }),
            },
            include: {
                studentLanguageGoal: true,
            },
        });

    }

}