'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types";
import Services from "@/services";

interface AuthProviderData{
    user: User | null,
    setUser: (user: User | null) => void,
}

//Context para compartilhar dados sem precisar de props
const AuthContext = createContext({} as AuthProviderData); //{} valor inicial vazio e as AuthProviderData garante que vai ter esse formato

export function AuthProvider({children}: {children: React.ReactNode}){

    const [user, setUser] = useState<User | null>(null);

    useEffect(()=>{
        Services.Auth.getMe().then(setUser).catch(()=>setUser(null));
    },[]);

    return(

        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>

    )

}

export function useAuthProvider(){
    return useContext(AuthContext);
}