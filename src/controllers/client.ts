import { Request, Response } from "express"
import { handelHttp } from "../utils/error.handle"
import { insertOneClient , getAllClients, getclientById, updateOneClient, deleteOneClient} from "../services/client"

const getclient = async ({ params }: Request, res: Response) =>{
    try {
        const { id } = params;
        const response = await getclientById(id);
        res.send(response);
    } catch (error) {
        handelHttp(res,'ERROR_GET_CLIENT')
    }
}

const getclients = async (req: Request, res: Response) =>{
    try {
        const response = await getAllClients();
        res.send(response);

    } catch (error) {
        handelHttp(res,`ERROR_GET_CLIENTS ${error}`)
    }
}

const updateclient = async ({ params, body }:Request, res: Response) =>{
    try {
        const { id } = params;

        const response = await updateOneClient(id, body)
        res.send(response);
        
    } catch (error) {
        handelHttp(res,'ERROR_UPDATE_CLIENT')
    }
}

const postclient = async ({ body }:Request, res: Response) =>{
    try {
        const resposnseclient = await insertOneClient(body);
        res.send(resposnseclient);

    } catch (error) {
        handelHttp(res,'ERROR_POST_CLIENT', error)
    }
}

const deteleclient = async ({ params }:Request, res: Response) =>{
    try {
        const { id } = params;
        const response = await deleteOneClient(id);
        res.send(response);
        
    } catch (error) {
        handelHttp(res,'ERROR_DELETE_CLIENT')
    }
}

export {getclient, getclients, postclient, updateclient, deteleclient};