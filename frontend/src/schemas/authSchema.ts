import { z } from "zod";

export const registerStudentSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").min(1, "Nome é obrigatorio"),
    email: z.email("E-mail inválido").min(1, "E-mail é obrigatorio"),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres").min(1, "Senha é obrigatório"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatório"),
    studentLanguageGoal: z.array(z.string()).min(1, "Informe ao menos um idioma que quer aprender"),
}).refine((data)=>data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
}); //Refine faz validação customizada, data contem todos os campos do schema, compara password e confirmPassword se são iguais, se for tudo ok, se não for aparece a mensagem de erro no campo confirmPassword

export type RegisterStudentSchema = z.infer<typeof registerStudentSchema>;