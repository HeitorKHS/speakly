'use client'

import { useState } from "react";
import { Language } from "@/types";

export function useSelectedLanguages(){

    const [selectedLanguageId, setSelectedLanguageId] = useState<string>("");
    const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]); 

    const handleAdd = (languages: Language[]) => {
            
        const language = languages.find(l => l.id === selectedLanguageId);
    
        if(!language) return;
    
        //Evita duplicados
        if(selectedLanguages.some(l => l.id === language.id)) return;
    
        const updated = [...selectedLanguages, language];
        setSelectedLanguages(updated);
        setSelectedLanguageId("");
    
        return updated.map(l=>l.id);

    }
    
    const handleRemove= (id: string) => {
    
        const updated = selectedLanguages.filter(l => l.id !== id);
        setSelectedLanguages(updated);
        return updated.map(l => l.id);
    
    }

    return{
        selectedLanguageId,
        selectedLanguages,
        setSelectedLanguageId,
        handleAdd,
        handleRemove,
    }

}