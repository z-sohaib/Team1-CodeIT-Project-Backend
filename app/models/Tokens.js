import mongoose from "mongoose";
const DOCUMENT_NAME = "refreshTokens";
const COLLECTION_NAME = "tokens";

export const tokensSchema = new mongoose.Schema({
  refreshTokens: [{ type: String }],
});

export const RefreshTokens = mongoose.model(
  DOCUMENT_NAME,
  tokensSchema,
  COLLECTION_NAME
);
