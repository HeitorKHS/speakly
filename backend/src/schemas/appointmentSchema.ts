import { z } from "zod";

export const createAppointmentSchema = z.object({
    date: z.coerce.date("Data inválida"),
    startTime: z.string().regex(/^([01]\d|2[0-3]):(00|30)$/, "Horário inválido"),
});

export const updateAppointmentSchema = z.object({
    status: z.enum(["PENDING","CONFIRMED","CANCELLED","COMPLETED"]),
});

export type CreateAppointmentSchema = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentSchema = z.infer<typeof updateAppointmentSchema>;