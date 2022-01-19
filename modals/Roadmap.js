import mongoose from 'mongoose';
const DOCUMENT_NAME = 'Roadmap';
const COLLECTION_NAME = 'roadmaps';


export const roadmapSchema = new mongoose.Schema({ 
    id : { 
            type: mongoose.Schema.Types.String,
            required: true, 
    },
    Name: {                                
        type: mongoose.Schema.Types.String,
        required: true,
    },
    ListofCheckpoint: [
          {
            id : {
        type: mongoose.Schema.Types.String,
        required: true,
        }
          }
        ],
}, {
    timestamps: true,
});

export const RoadmapModel = mongoose.model(DOCUMENT_NAME, roadmapSchema, COLLECTION_NAME)  