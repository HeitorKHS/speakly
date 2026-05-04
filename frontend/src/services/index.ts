//Auth
import { registerStudent, login } from "./authService";

//Language
import { getLanguage } from "./languageService";

export default class Services{

    static readonly Auth = {
        registerStudent: registerStudent,
        login: login,
    }

    static readonly Language = {
        getLanguage: getLanguage,
    }

}