import { z } from "zod";

export const updateTeacherSchema = z.object({
    bio: z.string().min(1, "Bio é obrigatório").optional(),
    description: z.string().min(1, "Descrição é obrigatório").optional(),
    price: z.number().positive("Preço deve ser maior que zero").optional(),
    avatarUrl: z.url().optional(),
    teacherLanguageTaught: z.array(z.uuid()).min(1, "Informe ao menos um idioma que ensina").optional(),
    teacherLanguageSpoken: z.array(z.uuid()).min(1, "Informe ao menos um idioma que fala").optional(),
});

export type UpdateTeacherSchema = z.infer<typeof updateTeacherSchema>;