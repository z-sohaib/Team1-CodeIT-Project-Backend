import mongoose from 'mongoose';
const DOCUMENT_NAME = 'ProjectSubmission';
const COLLECTION_NAME = 'projectsubmissions';

export const projectsubmissionSchema = new mongoose.Schema({
    user_id: {                                
        type: mongoose.Schema.Types.String,
        required: true,
    },
    roadmap_id:  {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    checkpoint_id: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    projectlink: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model(DOCUMENT_NAME, projectsubmissionSchema, COLLECTION_NAME)  