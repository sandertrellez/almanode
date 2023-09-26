import { sign, verify } from "jsonwebtoken";
import { User } from "../interfaces/user.interface";

const JWT_SECRET = process.env.JWT_SECRET || "Alex";

const signToken = async (user: User) => {
    const { name, email } = user;
    const payload = { name, email}
    
    const jwt = sign(payload, JWT_SECRET);
    return jwt;
}

//So el token es valido se devuelve el payload
const verifyToken = (jwt: string) => {
    const payload = verify(jwt, JWT_SECRET);
    return payload;
}

export { signToken, verifyToken }
