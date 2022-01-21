import mongoose from 'mongoose';
const DOCUMENT_NAME = 'Article';
const COLLECTION_NAME = 'articles';


export const articleSchema = new mongoose.Schema({ 
    Categorie: {                                
        type: mongoose.Schema.Types.String,
        required: true,
    },
    Tags : [{ 
        type: mongoose.Schema.Types.String,
        required: true, 
    }],
    Title: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    Resume: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    Picture : { 
        type: mongoose.Schema.Types.String, 
        required:true
    },
}, {
    timestamps: true,
});

export default mongoose.model(DOCUMENT_NAME, articleSchema, COLLECTION_NAME)  