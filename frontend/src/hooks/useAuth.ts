import { RegisterStudentSchema, LoginSchema } from "@/schemas/authSchema";
import Services from "@/services";
import { useRouter } from "next/navigation";
import { UseFormSetError } from "react-hook-form"
import { useAuthProvider } from "@/provider/AuthProvider";

export function useAuth(){

    const router = useRouter();
    const { setUser } = useAuthProvider();

    const handleRegisterStudent = async (data: RegisterStudentSchema, setError: UseFormSetError<RegisterStudentSchema>) => {
    
        try {

            await Services.Auth.registerStudent(data);

            router.push("/");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(error:any) {
            
            if(error.response?.status === 409) {
                setError("email", { message: error.response.data?.message});
            } else{
                setError("root", { message: error.response.data?.message});
            }
        }
    
    }

    const handleLogin = async (data: LoginSchema, setError: UseFormSetError<LoginSchema>) => {

        try {

            const user = await Services.Auth.login(data);
            setUser(user);
            router.push("/");
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(error:any) {
            
            if(error.response?.status === 401){
                setError("email", {message: error.response.data?.message});
                setError("password", {message: error.response.data?.message});
            } else{
                setError("root", {message: error.response.data?.message});
            }

        }

    }

    const handleLogout = async () => {
        
        try {

            await Services.Auth.logout();
            setUser(null);
            router.push("/");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(error:any) {
            
            console.log(error.message);

        }

    }

    return{
        handleRegisterStudent,
        handleLogin,
        handleLogout,
    }

}