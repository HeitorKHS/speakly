import { prisma } from "../libs/prisma";
import { UpdateTeacherSchema, WeeklyAvailabilitySchema } from "../schemas/teacherSchema";

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
                        create: data.teacherLanguageSpoken.map(id => ({languageId: id})),
                    },
                }),
            },
            include: {
                teacherLanguageTaught: true,
                teacherLanguageSpoken: true,
            },
        })

    }

    async weeklyAvailability(teacherProfileId: string, data: WeeklyAvailabilitySchema){

        //$transaction = todas as operações devem dar certo
        await prisma.$transaction([
            //Apaga toda a grade antiga
            prisma.weeklyAvailability.deleteMany({where: {teacherProfileId}}),
            //Cria uma nova grade
            prisma.weeklyAvailability.createMany({
                data: data.slots.map(slot => ({
                    teacherProfileId,
                    dayOfWeek: slot.dayOfWeek,
                    startTime: slot.startTime,
                })),
            }),
        ]);

        return prisma.weeklyAvailability.findMany({
            where: { teacherProfileId }
        });

    }

}