import { User } from "../interfaces/user.interface"
import UserModel from "../models/user"
import { encrypt, verify } from "../utils/password.handle";
import { signToken } from "./jwt.handle";

const registerNewUser = async (user: User) => {
    
    const {email, password, name} = user;

    //Se valida con el email que el usuario no esté registrado
    const userExist = await UserModel.findOne({ email });
    if (userExist) return "ALREADY_USER_EXIST";

    //Se encripta el password
    const passwordHash = await encrypt(password);

    const response = await UserModel.create({email, password: passwordHash, name});
    return response;   
}

const loginUser = async (user: User) => {
    const {email, password} = user;

    const response = await UserModel.findOne({email});

    if(!response) return "USER_DONT_EXIST";

    const isCorrect = await verify(password, response.password);

    if(!isCorrect) return "WRONG_PASSWORD";

    const token = await signToken(response);
    
    const data = {token, user: response};

    return data;
}

export {loginUser, registerNewUser}