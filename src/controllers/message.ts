import { Request, Response } from "express";
import { handelHttp } from "../utils/error.handle";
import { getAllMessageService, getOneMessageService, sendMessageService } from "../services/message";
import { createTemplateService, getAllTemplateService } from "../services/template";

const createTemplate = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const response = await createTemplateService(body);
        res.send(response);        
    } catch (error) {
        handelHttp(res,'ERROR_GET_CLIENT')
    }    
}

const getAllTemplate = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const response = await getAllTemplateService(body);
        res.send(response);        
    } catch (error) {
        handelHttp(res,'ERROR_GET_CLIENT')
    }    
}

const getAllMessage = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const response = await getAllMessageService();
        res.send(response);
        
    } catch (error) {
        handelHttp(res,'ERROR_GET_ALL_MESSAGE')
    }    
}

const getOneMessage = async ({params}: Request, res: Response) => {
    const { to } = params;
    try {
        const response = await getOneMessageService(to);
        res.send(response);
        
    } catch (error) {
        handelHttp(res,'ERROR_GET_ALL_MESSAGE')
    }    
}

const sendMessage = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const response = await sendMessageService(body);
        res.send(response);
        
    } catch (error) {
        handelHttp(res,'ERROR_GET_CLIENT')
    }    
}

export { sendMessage, getAllMessage, getOneMessage, createTemplate, getAllTemplate };