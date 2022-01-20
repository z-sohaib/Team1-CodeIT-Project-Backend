import mongoose from 'mongoose';
const DOCUMENT_NAME = 'AdminAccount';
const COLLECTION_NAME = 'adminAccounts';


export const adminSchema = new mongoose.Schema({
    username: {                                
        type: mongoose.Schema.Types.String,
        required: true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    }
}, {
    timestamps: true,
});

export const AdminModel = mongoose.model(DOCUMENT_NAME, adminSchema, COLLECTION_NAME)  