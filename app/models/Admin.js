import mongoose from 'mongoose';
const DOCUMENT_NAME = 'AdminAccount';
const COLLECTION_NAME = 'adminAccounts';


export const adminSchema = new mongoose.Schema({ 
    id : { 
            type: mongoose.Schema.Types.String,
            required: true, 
    },
    Username: {                                
        type: mongoose.Schema.Types.String,
        required: true,
    },
    Email: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    Password: {
        type: mongoose.Schema.Types.String,
        required: true,
    }
}, {
    timestamps: true,
});

export const AdminModel = mongoose.model(DOCUMENT_NAME, adminSchema, COLLECTION_NAME)  