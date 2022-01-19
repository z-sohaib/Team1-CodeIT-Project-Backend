import mongoose from 'mongoose';
const DOCUMENT_NAME = 'Message';
const COLLECTION_NAME = 'messages';


export const messageSchema = new mongoose.Schema({ 
    id : { 
            type: mongoose.Schema.Types.String,
            required: true, 
    },
    UserEmail: {                                
        type: mongoose.Schema.Types.String,
        required: true,
    },
    Description: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
}, {
    timestamps: true,
});

export const MessageModel = mongoose.model(DOCUMENT_NAME, messageSchema, COLLECTION_NAME)  