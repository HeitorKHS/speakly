import { prisma } from "../libs/prisma";
import { CreateTeacherSchema, CreateStudentSchema } from "../schemas/authSchema";

export class AuthRepository{

    async createTeacher(data: CreateTeacherSchema, hashedPassword: string){

        return await prisma.user.create({
            data:{
                email: data.email,
                password: hashedPassword,
                role: "TEACHER",
                teacherProfile:{
                    create:{
                        name: data.name,
                        bio: data.bio,
                        description: data.description,
                        price: data.price,
                        avatarUrl: data.avatarUrl ?? null,
                        teacherLanguageTaught: {
                            create: data.teacherLanguageTaught.map(id => ({languageId: id})),
                        },
                        teacherLanguageSpoken: {
                            create: data.teacherLanguageSpoken.map(id => ({languageId: id})),
                        },
                    },
                },
            }
        });

    }

    async createStudent(data: CreateStudentSchema, hashedPassword: string){

        return await prisma.user.create({
            data:{
                email: data.email,
                password: hashedPassword,
                studentProfile:{
                    create: {
                        name: data.name,
                        studentLanguageGoal: {
                            create: data.studentLanguageGoal.map(id => ({languageId: id})),
                        },
                    },
                },
            },
        });

    }

    async login(email: string){

        return await prisma.user.findUnique({
            where: {email},
            include: {
                teacherProfile: { select: { id: true } },
                studentProfile: { select: { id: true } },
            },
        });
        
    }

}