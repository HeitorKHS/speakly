import { prisma } from "../libs/prisma";

export class LanguageRepository{

    async get(){

        return await prisma.language.findMany();

    }

}