import { prisma } from "../libs/prisma";
import { CreateTeacherSchema, CreateStudentSchema, LoginSchema } from "../schemas/userSchema";

export class UserRepository{

    async findUserByEmail(email: string){
        return prisma.user.findUnique({where: {email}});
    }

    async createTeacher(data: CreateTeacherSchema, hashedPassword: string){

        return await prisma.user.create({
            data:{
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: "TEACHER",
                teacherProfile:{
                    create:{
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
                name: data.name,
                email: data.email,
                password: hashedPassword,
                studentProfile:{
                    create: {
                        studentLanguageGoal: {
                            create: data.studentLanguageGoal.map(id => ({languageId: id})),
                        },
                    },
                },
            },
        });

    }

}