import { Schema, model } from "mongoose";
import { Message } from "../interfaces/message.interface";

const MessageSchema = new Schema<Message>(
    {
        from: {
            type: String,
        },
        to: {
            type: String,
            required: true
        },
        text: {
            type: String,
        },
        messageType: {
            type: String,
        },
        template: {
            type: String,
        },
        language: {
            type: String,
        },
        params: {
            type: Object,
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const messageModel = model("messages", MessageSchema);

export default messageModel;