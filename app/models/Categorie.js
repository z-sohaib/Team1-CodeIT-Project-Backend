import mongoose from 'mongoose';
const DOCUMENT_NAME = 'Categorie';
const COLLECTION_NAME = 'categories';

export const categorieSchema = new mongoose.Schema({
    Name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    ListOfRoadMap: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }
    }],
    ListOfArticles: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }
    }],
}, {
    timestamps: true,
});

export default mongoose.model(DOCUMENT_NAME, categorieSchema, COLLECTION_NAME)  