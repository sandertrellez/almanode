import { Router, request, response } from "express";

//libreria de fileSystem
import {readdirSync} from "fs";

//Devuelve el path actual (src/controller/routes)
const PATH_ROUTER = `${__dirname}`;
const router = Router();

//Se quita la extension a los archvos relidos .ts, .js etc
const cleanFileName = (filename:string) => {
    const file = filename.split('.').shift();
    return file;
}

//Se lee y se recorre los archivos en el Path actual
readdirSync(PATH_ROUTER).filter((filename) => {
    const cleanName = cleanFileName(filename);
    if (cleanName !== "index"){
        //Se importan los archivos leidos y posteriormente se usan en el router
        import(`./${cleanName}`).then((moduleRoute) =>{
            router.use(`/${cleanName}`, moduleRoute.router)
        })
    }
})

export {router};