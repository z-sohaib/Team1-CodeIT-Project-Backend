import mongoose from 'mongoose';
const DOCUMENT_NAME = 'UserAccount';
const COLLECTION_NAME = 'userAccounts';



const SubSchema = new mongoose.Schema ({ 
    id : { 
        type: mongoose.Schema.Types.String,
            required: true, 
    }, 
    checkPointId : { 
        type: mongoose.Schema.Types.String,
            required: true,     
    }
}
);
export const userSchema = new mongoose.Schema({ 
    id : { 
            type: mongoose.Schema.Types.String,
            required: true, 
    },
    UserName: {                                
        type: mongoose.Schema.Types.String,
        required: true,
    },
    CategorieFav : { 
        type: mongoose.Schema.Types.String,
        required: true, 
    },
    Email: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    Password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    RoadPosition:[SubSchema],
    Exp : { 
        type: mongoose.Schema.Types.Number, 
        required:true
    },
    Notification: [ {
        type: mongoose.Schema.Types.String,
        required: true,
    }],
}, {
    timestamps: true,
});

export const UserModel = mongoose.model(DOCUMENT_NAME, userSchema, COLLECTION_NAME)  