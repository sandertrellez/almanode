import { Schema, model } from "mongoose";
import { Client } from "../interfaces/client.interface";

const clientSchema = new Schema<Client>(
    {
        name: {
            type: String,
            required: true
        },
        email:{
            type: String,
            required:true,
            unique: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true
        }

    },
    {
        timestamps: true,
        versionKey: false
    }

)

const clientModel = model('clients', clientSchema);

export default clientModel;