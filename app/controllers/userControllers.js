import { UserModel } from "../models/User";
import errMsg from "../utils/ErrorsPage";

export async function getUser(req, res) {
  try {
    const { username, exp, roadposition } = await UserModel.findById(
      req.params.id
    );
    if (username)
      return res.status(200).json({
        status: 200,
        data: { username, exp, roadposition },
        message: "succefully retrived data",
      });
    return res.status(404).json(errMsg.notFound);
  } catch (e) {
    return res.status(500).json(errMsg.errorIntern);
  }
}

export async function getNotifications(req, res) {
  try {
    const { notification } = await UserModel.findById(req.decodedToken.id);

    if (notification)
      return res.status(200).json({
        status: 200,
        data: notification,
        message: "succefully retrived data",
      });
    return res.status(404).json(errMsg.notFound);
  } catch (e) {
    return res.status(500).json(errMsg.errorIntern);
  }
}
