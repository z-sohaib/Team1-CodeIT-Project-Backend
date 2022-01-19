import mongoose from 'mongoose';
const DOCUMENT_NAME = 'ProjectSubmission';
const COLLECTION_NAME = 'projectsubmissions';

export const projectsubmissionSchema = new mongoose.Schema({ 
    id : { 
            type: mongoose.Schema.Types.String,
            required: true, 
    },
    UserId: {                                
        type: mongoose.Schema.Types.String,
        required: true,
    },
    RoadMapId:  {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    CheckPointId: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    ProjectLink: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
}, {
    timestamps: true,
});

export const ProjectSubmissionModel = mongoose.model(DOCUMENT_NAME, projectsubmissionSchema, COLLECTION_NAME)  