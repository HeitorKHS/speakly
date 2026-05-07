//Auth
import { registerStudent, login, logout, getMe } from "./authService";

//Language
import { getLanguage } from "./languageService";

export default class Services{

    static readonly Auth = {
        registerStudent: registerStudent,
        login: login,
        logout: logout,
        getMe: getMe,
    }

    static readonly Language = {
        getLanguage: getLanguage,
    }

}