'use client'

import { useState, useEffect } from "react";
import { Language, getLanguage } from "@/services/languageService";

export function useLanguage(){

    const [languages, setLanguages] = useState<Language[]>([]);

    useEffect(()=>{
        getLanguage().then(setLanguages);
    }, []);

    return{
        languages,
    }

}