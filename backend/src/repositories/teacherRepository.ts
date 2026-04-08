import { prisma } from "../libs/prisma";
import { UpdateTeacherSchema } from "../schemas/teacherSchema";

export class TeacherRepository{

    async updateProfile(teacherId: string, data: UpdateTeacherSchema){

        //Remove os campos undefined antes de enviar ao Prisma
        const filteredData = Object.fromEntries(
            Object.entries({
                bio: data.bio,
                description: data.description,
                price: data.price,
                avatarUrl: data.avatarUrl,
            }).filter(([_, value]) => value !== undefined)
        )

        return await prisma.teacherProfile.update({
            where: { id: teacherId },
            data: {
                ...filteredData,
                //Se veio idiomas que ensina, apaga tudo e recria
                ...(data.teacherLanguageTaught !== undefined && {
                    teacherLanguageTaught: {
                        deleteMany: {},
                        create: data.teacherLanguageTaught.map(id => ({languageId: id})),
                    },
                }),
                //Se veio idiomas que fala, apaga tudo e recria
                ...(data.teacherLanguageSpoken !== undefined && {
                    teacherLanguageSpoken: {
                        deleteMany: {},
                        createset: data.teacherLanguageSpoken.map(id => ({languageId: id})),
                    },
                }),
            }
        })

    }

}