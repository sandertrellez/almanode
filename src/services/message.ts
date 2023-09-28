import { Request, response } from "express";
import { Whatsapp } from "../utils/whatsapp";
import { Message } from "../interfaces/message.interface";

const sendMessageService = async (body: Message) => {
    const { to, template  } = body;
    //const template = body.template;
    
    if (!to) return "PHONE_NUMBER_REQUIRED";

    const what = new Whatsapp();
    what.setTo(to);//Número de telefono del destinatario    

    if (template){
        //Si llegó un template, se envía el mensaje con template de whatsapp
        what.setTemplate(template);
        const response = await what.sendTemplateMessage();
        //Si se envió, guardar en db

        return response;        
    }else{
        //Sino llega template se envía un mensaje personalizado
        const response = await what.sendPersonalizedMessage();
        //Si se envió giardar en db

        return response;   
    }
}

export {sendMessageService };