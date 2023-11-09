import { Request, response } from "express";
import { Whatsapp } from "../utils/whatsapp";
import { Message } from "../interfaces/message.interface";
import messageModel from "../models/message";

const sendMessageService = async (body: Message) => {
    const { to, template, language, params, text } = body;
    //const template = body.template;
    
    if (!to) return "PHONE_NUMBER_REQUIRED";

    const what = new Whatsapp();
    what.setTo(to);//Número de telefono del destinatario    

    if (template){
        //Si llegó un template, se envía el mensaje con template de whatsapp
        what.setTemplate(template);
        what.setMessageType("template");
        what.setLanguage(language);
        what.setParams(params);
        
        const responseWhat = await what.sendTemplateMessage();

        //Si hay error al enviat el mensaje se retorna el mensaje
        if (responseWhat.error)  return responseWhat.error.message;

        //Si se envió, guardar en db
        const response = await messageModel.create(body);

        return response;        
    }else{
        //Sino llega template se envía un mensaje personalizado
        what.setMessageType("text");
        what.setText(text);

        const responseWhat = await what.sendPersonalizedMessage();
        
        //Si hay error al enviat el mensaje se retorna el mensaje
        if (responseWhat.error)  return responseWhat.error.message;
        
        console.log(responseWhat);
        //Si se envió giardar en db

        const response = await messageModel.create(body);

        return response;   
    }
}

const getAllMessageService = async () => {
  
    //const response = await messageModel.find();
    const response = await messageModel.aggregate([
        {
          $sort: { createdAt: -1 }, //Se ordenan los documentos por createdAt desc
        },
        {
          $group: {
            _id: "$to", //Se agrupa por el campo to
            message: { $first: "$$ROOT" }, //Se obtiene el primer documento de cada grupo
          },
        },
      ])
    return response;
}

const getOneMessageService = async (to: String) => {
  
    const response = await messageModel.find({to: to});
    return response;
}

export {sendMessageService, getAllMessageService, getOneMessageService };