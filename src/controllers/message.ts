import { Request, Response } from "express";
import { handelHttp } from "../utils/error.handle";
import { sendMessageService } from "../services/message";
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

const sendMessage = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const response = await sendMessageService(body);
        res.send(response);
        
    } catch (error) {
        handelHttp(res,'ERROR_GET_CLIENT')
    }    
}

export { sendMessage, createTemplate, getAllTemplate };