const bcrypt = require('bcrypt');
import Admin from "../models/Admin";
import resMsg from "../controllers/ErrorsPage.js";


//signup function for admins
export  async function admin_signup(req,res) {
    try{
        const {username, email, password} = req.body;
          
          const EmailExists = await Admin.findOne({email : email});
          const UsernameExists = await Admin.findOne({username : username});

          if (EmailExists) { 
            return res
              .status(400)
              .json({ status: 400, message: "email already exists" });
            }
  
          if (UsernameExists) { 
            return res
              .status(400)
              .json({ status: 400, message: "username already taken" });
            }
        const hashed_psw = await bcrypt.hash(password,10);

        await Admin.create({
            username,
            email,
            hashed_psw,
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
        const EmailExists = await Admin.findOne({email : email});
        const PswExists = await Admin.findOne({password : password});
        
        if(!EmailExists){
            return res
                .status(400)
                .json({ status: 400, message: "email incorrect!" });
        }
        if(!PswExists){
            return res  
                .status(400)
                .json({ status: 400, message: "password incorrect!" });
        }

        return res
        .status(200)
        .json({status: 201, message : "you are loged in"});
            
    }catch(e){
    return res.status(500).json(resMsg.errorIntern);  
    }
}

//delete account function
export function delete_admin_account(req,res){
    try{
        await Admin.deleteOne({ _id: req.params.id });
    return res
      .status(200)
      .json({ status: 200, data: article, message: "Succesfully deleted" });
    }catch(e){
        return res.status(500).json(resMsg.errorIntern); 
    }
}



export function logout(req, res) {
    try {
      return res
        .status(200)
        .json({ status: 200, message: "logged out succesfully" });
    } catch (e) {
      return res.status(500).json(resMsg.errorIntern);
    }
  }





