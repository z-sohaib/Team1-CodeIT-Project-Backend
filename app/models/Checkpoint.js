import mongoose from 'mongoose';
const DOCUMENT_NAME = 'checkpoint';
const COLLECTION_NAME = 'checkpoints';

export const checkpointSchema = new mongoose.Schema({
    name: {                                
        type: mongoose.Schema.Types.String,
        required: true,
    },
    number : { 
        type: mongoose.Schema.Types.Number,
        required: true, 
    },
    expvalue: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    listOfprimarylinks: [ {
        type: mongoose.Schema.Types.String,
        required: true,
    }],
    listofsecondarylinks: [ {
        type: mongoose.Schema.Types.String,
        required: true,
    }],
    quizz:[
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
    project : {
        type: mongoose.Schema.Types.String,
        required: true,
    }
}, {
    timestamps: true,
});

export const CheckPointModel = mongoose.model(DOCUMENT_NAME, checkpointSchema, COLLECTION_NAME)  