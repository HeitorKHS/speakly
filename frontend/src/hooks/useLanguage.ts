'use client'

import { useState, useEffect } from "react";
import { getLanguage } from "@/services/languageService";
import { Language } from "@/types";

export function useLanguage(){

    const [languages, setLanguages] = useState<Language[]>([]);

    useEffect(()=>{
        getLanguage().then(setLanguages);
    }, []);

    return{
        languages,
    }

}