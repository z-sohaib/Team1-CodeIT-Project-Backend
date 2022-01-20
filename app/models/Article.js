import mongoose from 'mongoose';
const DOCUMENT_NAME = 'Article';
const COLLECTION_NAME = 'articles';


export const articleSchema = new mongoose.Schema({
    categorie: {                                
        type: mongoose.Schema.Types.String,
        required: true,
    },
    tags : [{ 
        type: mongoose.Schema.Types.String,
        required: true, 
    }],
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    resume: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    picture : { 
        type: mongoose.Schema.Types.String, 
        required:true
    },
}, {
    timestamps: true,
});

export const ArticleModel = mongoose.model(DOCUMENT_NAME, articleSchema, COLLECTION_NAME)  