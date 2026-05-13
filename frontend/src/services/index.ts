//Auth
import { registerStudent, login, logout, getMe, registerTeacher } from "./authService";

//Language
import { getLanguage } from "./languageService";

export default class Services{

    static readonly Auth = {
        registerStudent: registerStudent,
        login: login,
        logout: logout,
        getMe: getMe,
        registerTeacher: registerTeacher,
    }

    static readonly Language = {
        getLanguage: getLanguage,
    }

}