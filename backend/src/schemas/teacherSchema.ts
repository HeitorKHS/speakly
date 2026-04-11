import { z } from "zod";

export const updateTeacherSchema = z.object({
    bio: z.string().min(1, "Bio é obrigatório").optional(),
    description: z.string().min(1, "Descrição é obrigatório").optional(),
    price: z.number().positive("Preço deve ser maior que zero").optional(),
    avatarUrl: z.url().optional(),
    teacherLanguageTaught: z.array(z.uuid()).min(1, "Informe ao menos um idioma que ensina").optional(),
    teacherLanguageSpoken: z.array(z.uuid()).min(1, "Informe ao menos um idioma que fala").optional(),
});

export const weeklyAvailabilitySchema = z.object({
    slots: z.array(
        z.object({
            dayOfWeek: z.number().min(0).max(6),
            startTime: z.string().regex(/^([01]\d|2[0-3]):(00|30)$/, "Horário inválido")
            //O regex garante que o startTime está no formato correto HH:MM e que tenha intervalo de 30 minutos
        })
    )
});

export const availabilityOverrideSchema = z.object({
    date: z.coerce.date("Data inválida"),
    startTime: z.string().regex(/^([01]\d|2[0-3]):(00|30)$/, "Horário inválido"),
    type: z.enum(["UNBLOCK", "BLOCK"]),
});

export const blockDaySchema = z.object({
    date: z.coerce.date("Data inválida"),
    slots: z.array(
        z.string().regex(/^([01]\d|2[0-3]):(00|30)$/, "Horário inválido")
    ).min(1)
})

export type UpdateTeacherSchema = z.infer<typeof updateTeacherSchema>;
export type WeeklyAvailabilitySchema = z.infer<typeof weeklyAvailabilitySchema>;
export type AvailabilityOverrideSchema = z.infer<typeof availabilityOverrideSchema>;
export type BlockDaySchema = z.infer<typeof blockDaySchema>;