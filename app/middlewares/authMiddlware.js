import { AdminModel } from "../models/Admin.js";
import jwt from "jsonwebtoken";
import "dotenv/config"

export function checkAuth(req, res, next) {
  const token = req.cookies.jwt;
  try {
    if (!token)
      if (req.cookies.jwt_refresh)
        return res.status(403).json({ status: 403, message: "expired token" });
      else
        return res
          .status(401)
          .json({ status: 401, message: "user not authenticated" });

    jwt.verify(token, process.env.JWT_SECRET_KEY);

    next();
  } catch (e) {
    return res.status(403).json({ status: 403, message: "not authorized" });
  }
}

export async function checkAdmin(req, res, next) {
  const token = req.cookies.jwt;
  try {
    const checkedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const admin = await AdminModel.findById(checkedToken.id);
    if (admin) next();
    else
      return res.status(403).json({ status: 403, message: "not authorized" });
  } catch (e) {
    return res.status(403).json({ status: 403, message: "not authorized" });
  }
}
