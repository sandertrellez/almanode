import { Request, Response } from "express"
import { loginUser, registerNewUser } from "../services/auth";

const registerController = async ({ body }: Request, res: Response) => {
    const response = await registerNewUser(body);
    res.send(response);

}

const loginController = async ({ body }: Request, res: Response) => {
    const response = await loginUser(body);

    res.send(response);    
}

export {loginController, registerController};