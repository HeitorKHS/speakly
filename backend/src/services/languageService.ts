import { LanguageRepository } from "../repositories/languageRepository";

const languageRepository = new LanguageRepository();

export class LanguageService{

    async get(){
        return await languageRepository.get();
    }

}