import { prisma } from "../libs/prisma";
import { UpdateTeacherSchema, WeeklyAvailabilitySchema, AvailabilityOverrideSchema } from "../schemas/teacherSchema";

export class TeacherRepository{

    async updateProfile(teacherProfileId: string, data: UpdateTeacherSchema){

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
            where: { id: teacherProfileId },
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

    async addAvailabilityOverride(teacherProfileId: string, data: AvailabilityOverrideSchema){

        await prisma.availabilityOverride.create({
            data: {
                teacherProfileId,
                ...data,
            },
        });

        return this.getAvailabilityOverride(teacherProfileId);

    }

    async deleteAvailabilityOverride(teacherProfileId: string, id: string){

        await prisma.availabilityOverride.delete({where:{id}});

        return this.getAvailabilityOverride(teacherProfileId);

    }

    async getAvailabilityOverride(teacherProfileId: string){

        return await prisma.availabilityOverride.findMany({where: {teacherProfileId}});

    }

}