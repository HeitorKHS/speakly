import { AppointmentRepository } from "../repositories/appointmentRepository";
import { CreateAppointmentSchema, UpdateAppointmentSchema } from "../schemas/appointmentSchema";
import { TeacherRepository } from "../repositories/teacherRepository";

const appointmentRepository = new AppointmentRepository();
const teacherRepository = new TeacherRepository();

export class AppointmentService{

    async create(teacherProfileId: string, studentProfileId: string, data: CreateAppointmentSchema){

        //Verifica se o professor existe
        const teacher = await teacherRepository.findById(teacherProfileId);

        if(!teacher){
            throw new Error("Professor não encontrado");
        }

        //Verifica se a data é 1 dia antes do agendamento
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        if(new Date(data.date) < tomorrow){
            throw new Error("O agendamento deve ser feito com pelo menos 1 dia de antecedência");
        }

        // Converte a data para o dia da semana de 0-6
        const date = new Date(data.date)
        const dayOfWeek = date.getUTCDay()

        // Verifica se o horário está na grade semanal
        const weeklySlot = await teacherRepository.findWeeklySlot(teacherProfileId, dayOfWeek, data.startTime);
        
        if (!weeklySlot) {
            throw new Error("Horário não disponível");
        }

        const conflict = await appointmentRepository.findByTeacherDateTime(teacherProfileId, data.date, data.startTime);
        
        if(conflict){
            throw new Error("Horário já ocupado");
        }

        return await appointmentRepository.create(teacherProfileId, studentProfileId, data);

    }

    async getById(id: string){

        return await appointmentRepository.getById(id);

    }

    async cancel(id: string){

        return await appointmentRepository.cancel(id);

    }

    async getByTeacher(teacherProfileId: string){

        return await appointmentRepository.getByTeacher(teacherProfileId);
        
    }

    async getByStudent(studentProfileId: string){

        return await appointmentRepository.getByStudent(studentProfileId);

    }

    async update(id: string, data: UpdateAppointmentSchema){

        return await appointmentRepository.update(id, data);
        
    }

}