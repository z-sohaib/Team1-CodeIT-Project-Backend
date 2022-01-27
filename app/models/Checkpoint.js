import mongoose from 'mongoose';
const DOCUMENT_NAME = 'checkpoint';
const COLLECTION_NAME = 'checkpoints';

export const checkpointSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    number: {
        type: mongoose.Schema.Types.Number,
        required: true,
        unique: true,
    },
    expvalue: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    listOfprimarylinks: [{
        link: {
            type: mongoose.Schema.Types.String,
            required: true,
        }
    }],
    listofsecondarylinks: [{
        link: {
            type: mongoose.Schema.Types.String,
            required: true,
        }
    }],
    quizz: [
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
    project: {
        type: mongoose.Schema.Types.String,
        //required: true,
    }
}, {
    timestamps: true,
});

export default mongoose.model(DOCUMENT_NAME, checkpointSchema, COLLECTION_NAME)  