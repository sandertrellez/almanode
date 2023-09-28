import { Template } from "../interfaces/ITemplate";
import { Whatsapp } from "../utils/whatsapp";

const createTemplateService = async (body: Template) => {
    const { name, language, text,  example  } = body;
    //const template = body.template;
    
    if (!name) return "PHONE_NUMBER_REQUIRED";
    if (!language) return "LANGUAGE_REQUIRED";
    if (!text) return "TEXT_REQUIRED";

    const what = new Whatsapp();

    what.setName(name);
    what.setLanguage(language);
    what.setText(text);
    what.setExample(example);

    const response = await what.createTemplate();
    //Si se envió la creación del template => guardar en db

    return response;    
}

const getAllTemplateService = async (body: Template) => {
    const { name, language, text,  example  } = body;
    //const template = body.template;

    const what = new Whatsapp();

    const response = await what.getTemplates();
    //Si se envió la creación del template => guardar en db

    return response;    
}

export { createTemplateService, getAllTemplateService };