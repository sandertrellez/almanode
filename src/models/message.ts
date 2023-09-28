import { Model, Schema } from "mongoose";
import { Message } from "../interfaces/message.interface";

const MessageSchema = new Schema<Message>(
    {
        from: {
            type: String,
            required: true        
        },
        to: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const MessageModel = new Model("messages", MessageSchema);

export default MessageModel;