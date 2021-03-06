import mongoose from 'mongoose';
const DOCUMENT_NAME = 'Message';
const COLLECTION_NAME = 'messages';


export const messageSchema = new mongoose.Schema({
    useremail: {                                
        type: mongoose.Schema.Types.String,
        required: true,
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model(DOCUMENT_NAME, messageSchema, COLLECTION_NAME)  