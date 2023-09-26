import { Client } from "../interfaces/client.interface";
import clientModel from "../models/client";

const insertOneClient = async (client: Client) => {

    const { email } = client;

    //Se valida con el email que el usuario no esté registrado
    const userExist = await clientModel.findOne({ email });
    if (userExist) return "ALREADY_CLIENT_EXIST";

    const responInsert = await clientModel.create(client);
    return responInsert;
}

const  getAllClients = async () => {
    const resposnseclient = await clientModel.find({});
    return resposnseclient;
}

const  getclientById = async (id: string) => {
    const resposnseclient = await clientModel.findOne({_id: id});
    return resposnseclient;
}

const updateOneClient =async (id: String, data: Client) => {
    const resposnseclient = await clientModel.findOneAndUpdate({_id: id}, data,{
        new: true
    });
    return resposnseclient;
}

const  deleteOneClient = async (id: string) => {
    const resposnseclient = await clientModel.deleteOne({_id: id});
    return resposnseclient;
}
export { insertOneClient , getAllClients, getclientById, updateOneClient, deleteOneClient};