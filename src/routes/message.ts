import { Router } from "express";
import { checkJwt } from "../middleware/session";
import { createTemplate, getAllTemplate, sendMessage } from "../controllers/message";

const router = Router();

router.post('/template', checkJwt, createTemplate);//Creación de plantillas
router.get('/template', checkJwt, getAllTemplate);//Obtener todas las plantillas

router.post('/sendMessage', checkJwt, sendMessage);//Envío de mensajes con plantillas, o personalizados

export { router };
