import { z } from "zod";

export const updateStudentSchema = z.object({
    name: z.string().min(1, "Nome é obrigatorio").optional(),
    studentLanguageGoal: z.array(z.uuid()).min(1, "Informe ao menos um idioma que quer aprender").optional(),
});

export type UpdateStudentSchema = z.infer<typeof updateStudentSchema>;