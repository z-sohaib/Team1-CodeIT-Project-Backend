const express = require('express');
const mongoose = require('mongoose');

const URI= "mongodb+srv://GDGCIT1:GDGCIT1@gdgcodeit1.zionq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const ConnectDB = async()=>{
    await mongoose.connect(URI,);
    console.log("Connection Done");
}

module.exports=ConnectDB;