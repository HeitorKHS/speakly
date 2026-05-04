import axios from "axios"; //Biblioteca para requisições HTPP (GET, POST, etc)

//Cria uma instância do Axios chamada api. Serve para não precisar repetir a URL base nas requisições
export const api = axios.create({
    baseURL: "http://localhost:3333",
    withCredentials: true,
});
