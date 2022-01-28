import bcrypt from "bcrypt";
import { AdminModel } from "../models/Admin";
import resMsg from "../utils/ErrorsPage.js";
import { createRefreshToken, createToken } from "./authController";
import { RefreshTokens } from "../models/Tokens";

//signup function for admins
export async function admin_signup(req, res) {
  try {
    const { username, email, password } = req.body;

    const EmailExists = await AdminModel.findOne({ email: email });
    const UsernameExists = await AdminModel.findOne({ username: username });

    if (EmailExists) {
      //if the email exitsts
      return res
        .status(400)
        .json({ status: 400, message: "email already exists" });
    }

    if (UsernameExists) {
      //if the username is already taken
      return res
        .status(400)
        .json({ status: 400, message: "username already taken" });
    }
    const hashed_psw = await bcrypt.hash(password, 10); //hashing the password

    await AdminModel.create({
      //create the admin account by adding those informations in the DB
      username,
      email,
      password: hashed_psw, //the hashed password is saved in the DB
    });
    return res
      .status(200)
      .json({ status: 201, message: "Admin created sucesfully" });
  } catch (e) {
    return res.status(500).json(resMsg.errorIntern);
  }
}

//login function for admins
export async function admin_login(req, res) {
  try {
    const { email, password } = req.body;

    const admin = email && (await AdminModel.findOne({ email: email })); //check if the email exists in the DB
    if (!admin)
      //if it doesn't exist
      return res.status(400).json({ status: 400, message: "email incorrect!" });

    const Psw = password && (await bcrypt.compare(password, admin.password)); //compare the password with the hashed password in the DB
    if (!Psw)
      //if it's incorrect
      return res
        .status(400)
        .json({ status: 400, message: "password incorrect!" });
    createToken(admin._id, res);
    createRefreshToken(admin._id, res);
    return res //else : the admin is loged in
      .status(200)
      .json({
        status: 201,
        data: { id: admin._id, username: admin.username },
        message: "you are loged in",
      });
  } catch (e) {
    return res.status(500).json(resMsg.errorIntern);
  }
}

//delete account function
export async function delete_admin_account(req, res) {
  try {
    await AdminModel.deleteOne({ _id: req.params.id }); //delete the admin in the DB
    return res
      .status(200)
      .json({ status: 200, message: "Succesfully deleted" });
  } catch (e) {
    return res.status(500).json(resMsg.errorIntern);
  }
}

//log out function for the admins
export async function admin_logout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.cookie("jwt_refresh", "", { maxAge: 1 });
    await RefreshTokens.updateOne(
      {},
      { $pull: { refreshTokens: req.cookies.jwt_refresh } }
    );

    return res
      .status(200)
      .json({ status: 200, message: "logged out succesfully" });
  } catch (e) {
    return res.status(500).json(resMsg.errorIntern);
  }
}
