import { Request, Response, Router } from "express";
import { deteleclient, getclient, getclients, postclient, updateclient } from "../controllers/client";
import { checkJwt } from "../middleware/session";

const router = Router();

/**
 * http://localhost:PORT/ [GET]
 */
router.get('/', checkJwt, getclients)
router.get('/:id', checkJwt, getclient)
router.post('/', checkJwt, postclient)
router.put('/:id', checkJwt, updateclient)
router.delete('/:id', checkJwt, deteleclient)

export {router};