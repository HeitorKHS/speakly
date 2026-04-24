//Auth
import { registerStudent } from "./authService";

//Language
import { getLanguage } from "./languageService";

export default class Services{

    static readonly Auth = {
        registerStudent: registerStudent,
    }

    static readonly Language = {
        getLanguage: getLanguage,
    }

}