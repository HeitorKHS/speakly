import { prisma } from "../libs/prisma";
import { UpdateTeacherSchema, WeeklyAvailabilitySchema } from "../schemas/teacherSchema";

export class TeacherRepository{

    async update(teacherProfileId: string, data: UpdateTeacherSchema){

        //Remove os campos undefined antes de enviar ao Prisma
        const filteredData = Object.fromEntries(
            Object.entries({
                name: data.name,
                bio: data.bio,
                description: data.description,
                price: data.price,
                avatarUrl: data.avatarUrl,
            }).filter(([_, value]) => value !== undefined)
        )

        return await prisma.teacherProfile.update({
            where: {id:teacherProfileId },
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

    async findById(id: string){

        return await prisma.teacherProfile.findUnique({
            where: {id},
        });

    }

    async createWeeklyAvailability(teacherProfileId: string, data: WeeklyAvailabilitySchema){

        //$transaction = todas as operações devem dar certo
        return await prisma.$transaction([
            //Apaga toda a grade antiga
            prisma.weeklyAvailability.deleteMany({
                where: {teacherProfileId},
            }),
            //Cria uma nova grade
            prisma.weeklyAvailability.createMany({
                data: data.slots.map(slot => ({
                    teacherProfileId,
                    dayOfWeek: slot.dayOfWeek,
                    startTime: slot.startTime,
                })),
            }),
        ]);

    }

    async getWeeklyAvailability(teacherProfileId: string){

        return await prisma.weeklyAvailability.findMany({
            where: {teacherProfileId},
        });

    }


    async findWeeklySlot(teacherProfileId: string, dayOfWeek: number, startTime: string){

        return await prisma.weeklyAvailability.findFirst({
            where: {
                teacherProfileId,
                dayOfWeek,
                startTime,
            }
        });

    }

    /*async addAvailabilityOverride(teacherProfileId: string, data: AvailabilityOverrideSchema){

        await prisma.availabilityOverride.create({
            data: {
                teacherProfileId,
                date: new Date(data.date),
                startTime: data.startTime,
                type: data.type,
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

    async findOverridesByDate(teacherProfileId: string, date: Date){

        return await prisma.availabilityOverride.findFirst({
            where: {
                teacherProfileId,
                date: new Date(date),
            },
        });

    }*/

}