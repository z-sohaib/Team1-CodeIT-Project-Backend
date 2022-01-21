import mongoose from 'mongoose';
const DOCUMENT_NAME = 'checkpoint';
const COLLECTION_NAME = 'checkpoints';

export const checkpointSchema = new mongoose.Schema({ 
    Name: {                                
        type: mongoose.Schema.Types.String,
        required: true,
    },
    Number : { 
        type: mongoose.Schema.Types.Number,
        required: true, 
    },
    ExpValue: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    ListOfPrimaryLinks: [ {
        type: mongoose.Schema.Types.String,
        required: true,
    }],
    ListOfSecondaryLinks: [ {
        type: mongoose.Schema.Types.String,
        required: true,
    }],
    Quizz:[
        {
            Question: { 
                type: mongoose.Schema.Types.String,
                required: true,
            },
            Answer: { 
                type: mongoose.Schema.Types.String,
                required: true,
            },
            Proposition: { 
                type: mongoose.Schema.Types.String,
                required: true,
            },
            
        }
    ], 
    Project : {
        type: mongoose.Schema.Types.String,
        required: true,
    }
}, {
    timestamps: true,
});

export default mongoose.model(DOCUMENT_NAME, checkpointSchema, COLLECTION_NAME)  