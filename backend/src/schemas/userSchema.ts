import { z } from "zod";

const userSchema = z.object({
    name: z.string().min(1, "Nome é obrigatorio"),
    email: z.email("Email inválido"),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

const teacherSchema = z.object({
    bio: z.string().min(1, "Bio é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatório"),
    price: z.number().positive("Preço deve ser maior que zero"),
    avatarUrl: z.url().optional(),
    teacherLanguageTaught: z.array(z.string()).min(1, "Informe ao menos um idioma que ensina"),
    teacherLanguageSpoken: z.array(z.string()).min(1, "Informe ao menos um idioma que fala"),
});

const studentSchema = z.object({
    languageGoals: z.array(z.string()).min(1, "Informe ao menos um idioma que quer aprender"),
});

export const createTeacherSchema = z.object({
    ...userSchema.shape,
    ...teacherSchema.shape,
});

export const createStudentSchema = z.object({
    ...userSchema.shape,
    ...studentSchema.shape,
});

export type CreateTeacherSchema = z.infer<typeof createTeacherSchema>;
export type CreateStudentSchema = z.infer<typeof createStudentSchema>;