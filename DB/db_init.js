import mongoose from "mongoose";


const URI= "mongodb+srv://GDGCIT1:GDGCIT1@gdgcodeit1.zionq.mongodb.net/myDatabase?retryWrites=true&w=majority";

const ConnectDB = async () => {
    await mongoose.connect(URI, {useUnifiedTopology: true, useNewUrlParser: true});
    console.log("Connection Done");
}

export default ConnectDB;