const bcrypt = require('bcrypt');
import Admin from "../models/Admin";
import resMsg from "../controllers/ErrorsPage.js";


//signup function for admins
export  async function admin_signup(req,res) {
    try{
        const {username, email, password} = req.body; 
          
          const EmailExists = await Admin.findOne({email : email}); 
          const UsernameExists = await Admin.findOne({username : username});

          if (EmailExists) { //if the email exitsts
            return res
              .status(400)
              .json({ status: 400, message: "email already exists" });
            }
  
          if (UsernameExists) {  //if the username is already taken 
            return res
              .status(400)
              .json({ status: 400, message: "username already taken" });
            }
        const hashed_psw = await bcrypt.hash(password,10); //hashing the password

        await Admin.create({ //create the admin account by adding those informations in the DB
            username,
            email,
            hashed_psw, //the hashed password is saved in the DB 
        });
        return res
         .status(200)
         .json({status: 201, message : "Admin created sucesfully"});
    }catch(e){
        return res.status(500).json(resMsg.errorIntern);
    }
}

//login function for admins
export async function admin_login(req,res){
    try{
        const {email, password} = req.body;
      
        const admin = email && (await Admin.findOne({ email: email })); //check if the email exists in the DB
        if (!admin) //if it doesn't exist
          return res
            .status(400)
            .json({ status: 400, message: "email incorrect!" });
    
        const Psw = password && (await bcrypt.compare(password, admin.password)); //compare the password with the hashed password in the DB
        if (!Psw) //if it's incorrect
          return res
            .status(400)
            .json({ status: 400, message: "password incorrect!" });
       
        return res //else : the admin is loged in
        .status(200)
        .json({status: 201, message : "you are loged in"});
            
    }catch(e){
    return res.status(500).json(resMsg.errorIntern);  
    }
}

//delete account function
export function delete_admin_account(req,res){
    try{
        await Admin.deleteOne({ _id: req.params.id }); //delete the admin in the DB
    return res
      .status(200)
      .json({ status: 200, data: article, message: "Succesfully deleted" });
    }catch(e){
        return res.status(500).json(resMsg.errorIntern); 
    }
}


//log out function for the admins
export function admin_logout(req, res) {
    try {
      return res
        .status(200)
        .json({ status: 200, message: "logged out succesfully" });
    } catch (e) {
      return res.status(500).json(resMsg.errorIntern);
    }
  }





