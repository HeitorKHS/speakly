import { NextRequest, NextResponse } from "next/server";

//O middleware será executado para todas as solicitações, exceto para caminhos que correspondem a arquivos estáticos do Next.js (como imagens, arquivos JavaScript, favicon.ico, etc.)
export const config = {
     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

const privateRoutes = [
    "/appointments",
];

const teacherRoutes = [
    "/teacher",
];

const studentRoutes = [
    "/student",
]

export function proxy(req: NextRequest){

    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl; //Pega o caminho da URL que o usuário está tentando acessar.

    
    //privateRoutes.some retorna verdadeiro se a rota corresponder a alguma das condições
    const isPrivateRoute = privateRoutes.some(
        (route) => pathname === route || pathname.startsWith(route + "/")
    );

    //teacherRoutes.some retorna verdadeiro se a rota corresponder a alguma das condições
    const isTeacherRoute = teacherRoutes.some(
        (route) => pathname === route || pathname.startsWith(route + "/")
    );

    //studentRoutes.some retorna verdadeiro se a rota corresponder a alguma das condições
    const isStudentRoute = studentRoutes.some(
        (route) => pathname === route || pathname.startsWith(route + "/")
    );

    //Se não tiver token e tentar acessar rota protegia, redireciona para /login
    if(!token && (isPrivateRoute || isTeacherRoute || isStudentRoute)){
        return NextResponse.redirect(new URL("/login", req.url));
    }

    //Se tiver token e tentar acessar /login ou /register, redireciona para /dashboard
    if(token && (pathname === "/login" || pathname === "/register")){
        return NextResponse.redirect(new URL("/", req.url));
    }

    //Proteção de rotas teacher
    if(token && isTeacherRoute){

        //split(".") tranforma em ["header","payload","signature"], o [1] pega a segunda parte que é payload, o atob() decodifica Base64 para texto normal e o JSON.parse converto texto json para objeto javascript
        const payload = JSON.parse(atob(token.split(".")[1]));

        if(payload.role !== "TEACHER"){
            return NextResponse.redirect(new URL("/", req.url));
        }

    }

    //Proteção de rotas student
    if(token && isStudentRoute){

        //split(".") tranforma em ["header","payload","signature"], o [1] pega a segunda parte que é payload, o atob() decodifica Base64 para texto normal e o JSON.parse converto texto json para objeto javascript
        const payload = JSON.parse(atob(token.split(".")[1]));

        if(payload.role !== "STUDENT"){
            return NextResponse.redirect(new URL("/", req.url));
        }

    }

    return NextResponse.next();

}