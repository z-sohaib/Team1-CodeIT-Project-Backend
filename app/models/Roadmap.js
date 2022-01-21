import mongoose from 'mongoose';
const DOCUMENT_NAME = 'Roadmap';
const COLLECTION_NAME = 'roadmaps';


export const roadmapSchema = new mongoose.Schema({ 
    Name: {                                
        type: mongoose.Schema.Types.String,
        required: true,
    },
    listofcheckpoint: [
          {
            _id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        }
          }
        ],
}, {
    timestamps: true,
});

export default mongoose.model(DOCUMENT_NAME, roadmapSchema, COLLECTION_NAME) 
