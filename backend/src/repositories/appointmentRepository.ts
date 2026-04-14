import { prisma } from "../libs/prisma";
import { CreateAppointmentSchema, UpdateAppointmentSchema } from "../schemas/appointmentSchema";

export class AppointmentRepository{

    async create(teacherProfileId: string, studentProfileId: string, data: CreateAppointmentSchema){

        return await prisma.appointment.create({       
            data: {
                teacherProfileId,
                studentProfileId,
                date: new Date(data.date),
                startTime: data.startTime,
            },
        });

    }

    async getById(id: string){

        return await prisma.appointment.findUnique({
            where: {id},
        });

    }

    async getByTeacher(teacherProfileId: string){

        return await prisma.appointment.findMany({
            where: {teacherProfileId},
            include: {
                studentProfile: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
                    },
                },
            },
        });

    }

    async getByStudent(studentProfileId: string){

        return await prisma.appointment.findMany({
            where: {studentProfileId},
            include: {
                teacherProfile: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
                    },
                },
            },
        });

    }

    async findByTeacherDateTime(teacherProfileId: string, date: Date, startTime: string){

        return await prisma.appointment.findFirst({
            where: {
                teacherProfileId,
                date: new Date(date),
                startTime,
                status: {not: "CANCELLED"},
            },
        });

    }

    async update(id: string, data: UpdateAppointmentSchema){

        return await prisma.appointment.update({
            where: {id},
            data,
        });

    }

    async cancel(id: string){

        return await prisma.appointment.update({
            where: {id},
            data: {
                status: "CANCELLED",
            },
        })

    }

}