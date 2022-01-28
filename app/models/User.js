import mongoose from "mongoose";
const DOCUMENT_NAME = "UserAccount";
const COLLECTION_NAME = "userAccounts";

const SubSchema = new mongoose.Schema({
  checkPoint_id: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});
export const userSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    categoriefav: {
      type: mongoose.Schema.Types.String,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    roadposition: [SubSchema],
    exp: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    notification: [
      {
        type: mongoose.Schema.Types.String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model(
  DOCUMENT_NAME,
  userSchema,
  COLLECTION_NAME
);
