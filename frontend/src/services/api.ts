import axios from "axios"; //Biblioteca para requisições HTPP (GET, POST, etc)
import Cookies from "js-cookie"; //Biblioteca para ler e salvar cookies no navegador

//Cria uma instância do Axios chamada api. Serve para não precisar repetir a URL base nas requisições
export const api = axios.create({
    baseURL: "http://localhost:3333",
});

//Executa antes da requisição ser enviado
api.interceptors.request.use((config)=>{

    //Pega o token no cookie
    const token = Cookies.get("token");

    //Se existir, ele adiciona no header da requisição
    if(token){
        config.headers.Authorization = `Bears ${token}`
    }

    return config;

});