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

    async saveTeacher(studentProfileId: string, teacherProfileId: string){

        return await prisma.savedTeacher.create({
            data: {studentProfileId, teacherProfileId},
        });

    }

    async removeSaveTeacher(studentProfileId: string, teacherProfileId: string){

        return await prisma.savedTeacher.delete({
            where:{
                studentProfileId_teacherProfileId: {studentProfileId, teacherProfileId},
            },
            include: {
                teacherProfile: {
                    include: {
                        user: { select: { name: true, email: true } },
                        teacherLanguageTaught: { include: { language: true } },
                        teacherLanguageSpoken: { include: { language: true } },
                    },
                },
            },
        });

    }

    async getSavedTeacher(studentProfileId: string){

        return await prisma.savedTeacher.findMany({
            where: {studentProfileId},
            include: {
                teacherProfile: {
                    include: {
                        user: { select: { name: true, email: true } },
                        teacherLanguageTaught: { include: { language: true } },
                        teacherLanguageSpoken: { include: { language: true } },
                    },
                },
            },
        });

    }

}