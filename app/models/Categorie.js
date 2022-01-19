import mongoose from 'mongoose';
const DOCUMENT_NAME = 'Categorie';
const COLLECTION_NAME = 'categories';

export const categorieSchema = new mongoose.Schema({ 
    id : { 
            type: mongoose.Schema.Types.String,
            required: true, 
    },
    Name: {                                
        type: mongoose.Schema.Types.String,
        required: true,
    },
    ListOfRoadMap: [{
        id : {
    type: mongoose.Schema.Types.String,
    required: true,
    }
      }],
    ListOfArticles: [{
        id : {
    type: mongoose.Schema.Types.String,
    required: true,
    }
      }],
}, {
    timestamps: true,
});

export const categorieModel = mongoose.model(DOCUMENT_NAME, categorieSchema, COLLECTION_NAME)  