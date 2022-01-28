import { UserModel } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import resMsg from "../utils/ErrorsPage.js";
import { RefreshTokens } from "../models/Tokens";

const MAX_AGE = 15; //max age in seconds = 15 minutes
const MAX_AGE_REFRESH = 60 * 60 * 24 * 60; //max age of refresh in seconds = 60 days

//creates the jwt token and sends the cookie
export const createToken = (id, res) => {
  const token = jwt.sign({ id }, "secret key", {
    expiresIn: MAX_AGE,
  });
  res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
  return token;
};
//creates jwt refresh token and sends the cookie
export const createRefreshToken = async (id, res) => {
  const token = jwt.sign({ id }, "secret refresh key", {
    expiresIn: MAX_AGE_REFRESH,
  });
  res.cookie("jwt_refresh", token, {
    httpOnly: true,
    maxAge: MAX_AGE_REFRESH * 1000,
  });
  await RefreshTokens.updateOne({}, { $push: { refreshTokens: token } });
  return token;
};

export async function signup(req, res) {
  const { username, email, password } = req.body;
  try {
    const exist = await UserModel.findOne({ email: email });
    if (exist)
      return res
        .status(400)
        .json({ status: 400, message: "email already exists" });

    const hashedPw = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      categoriefav: "default",
      email,
      password: hashedPw,
      roadposition: [],
      exp: 0,
      notification: [],
    });

    createToken(user._id, res);
    createRefreshToken(user._id, res);

    res.status(201).json({ status: 201, data: user._id, message: "signed up" });
  } catch (e) {
    res.status(400).json({ status: 400, message: e.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = email && (await UserModel.findOne({ email: email }));
    if (!user)
      return res.status(404).json({ status: 404, message: "incorrect email" });

    const isMatch = password && (await bcrypt.compare(password, user.password));
    if (!isMatch)
      return res.status(400).json({ status: 400, message: "wrong pasword" });

    const token = createToken(user._id, res);
    await createRefreshToken(user._id, res);

    const returnedUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
    return res
      .status(200)
      .json({ status: 200, data: returnedUser, token: token, message: "you are logged in" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

export async function logout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    //removes refresh token from db
    res.cookie("jwt_refresh", "", { maxAge: 1 });
    await RefreshTokens.updateOne(
      {},
      { $pull: { refreshTokens: req.cookies.jwt_refresh } }
    );

    return res.status(200).json({ status: 200, message: "you are logged out" });
  } catch (error) {
    return res.status(500).json(resMsg.errorIntern);
  }
}

export async function tokenRefresh(req, res) {
  try {
    const token = req.cookies.jwt_refresh;
    if (!token)
      return res.status(400).json({ status: 400, message: "no token" });

    const verefiedToken = jwt.verify(
      token,
      "secret refresh key" /*process.env.REFRESH_SECRET*/
    );
    const tokens = await RefreshTokens.findOne({});
    if (!tokens.refreshTokens.includes(token))
      return res
        .status(400)
        .json({ status: 400, message: "invalid refresh token" });

    createToken(verefiedToken.id, res);
    return res
      .status(200)
      .json({ status: 200, message: "token has been refreshed" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
}
