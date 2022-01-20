import mongoose from 'mongoose';
const DOCUMENT_NAME = 'Categorie';
const COLLECTION_NAME = 'categories';

export const categorieSchema = new mongoose.Schema({
    name: {                                
        type: mongoose.Schema.Types.String,
        required: true,
    },
    listofroadmap: [{
        id : {
        type: mongoose.Schema.Types.String,
        required: true,
    }
      }],
    listofarticles: [{
        id : {
    type: mongoose.Schema.Types.String,
    required: true,
    }
      }],
}, {
    timestamps: true,
});

export const categorieModel = mongoose.model(DOCUMENT_NAME, categorieSchema, COLLECTION_NAME)  