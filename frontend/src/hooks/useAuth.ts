import { RegisterStudentSchema } from "@/schemas/authSchema";
import Services from "@/services";
import { useRouter } from "next/navigation";
import { UseFormSetError } from "react-hook-form"

export function useAuth(){

    const router = useRouter();

    const handleRegisterStudent = async (data: RegisterStudentSchema, setError: UseFormSetError<RegisterStudentSchema>) => {
    
        try {
            console.log(data);
            await Services.Auth.registerStudent(data);

            router.push("/");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(error:any) {
            
            if (error.response?.status === 409) {
                setError("email", { message: "E-mail já em uso" })
            } else {
                setError("root", { message: "Erro ao criar conta. Tente novamente" })
            }
        }
    
    }

    return{
        handleRegisterStudent
    }

}