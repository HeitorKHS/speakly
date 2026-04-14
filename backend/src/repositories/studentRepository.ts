import { prisma } from "../libs/prisma";
import { UpdateStudentSchema } from "../schemas/studentSchema";

export class StudentRepository{

    async update(studentProfileId: string, data: UpdateStudentSchema){

        return await prisma.studentProfile.update({
            where: {id: studentProfileId},
            data: {
                ...(data.studentLanguageGoal !== undefined && {
                    studentLanguageGoal:{
                        deleteMany: {},
                        create: data.studentLanguageGoal.map(id => ({languageId: id})),
                    },
                }),
            },
            include: {
                studentLanguageGoal: {
                    include: {language: true},
                },
            },
        });

    }

    async findById(studentProfileId: string){

        return await prisma.studentProfile.findUnique({
            where: {id: studentProfileId},
        });

    }

    async findSavedTeacher(studentProfileId: string, teacherProfileId: string){

        return await prisma.savedTeacher.findUnique({
            where:{
                studentProfileId_teacherProfileId: {
                    studentProfileId,
                    teacherProfileId,
                },
            },
        });

    }

    async addTeacherToFavorite(studentProfileId: string, teacherProfileId: string){

        return await prisma.savedTeacher.create({
            data: {studentProfileId, teacherProfileId},
        });

    }

    async removeTeacherFromFavorite(studentProfileId: string, teacherProfileId: string){

        return await prisma.savedTeacher.delete({
            where:{
                studentProfileId_teacherProfileId: {studentProfileId, teacherProfileId},
            },
        });

    }

    async getFavorites(studentProfileId: string){

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