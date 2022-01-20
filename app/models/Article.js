import mongoose from "mongoose";
const DOCUMENT_NAME = "Article";
const COLLECTION_NAME = "articles";

<<<<<<< HEAD
export const articleSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    Categorie: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    Tags: [
      {
        type: mongoose.Schema.Types.String,
        required: true,
      },
    ],
    Title: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    Resume: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    Picture: {
      type: mongoose.Schema.Types.String,
      required: true,
=======

export const articleSchema = new mongoose.Schema({
    categorie: {                                
        type: mongoose.Schema.Types.String,
        required: true,
    },
    tags : [{ 
        type: mongoose.Schema.Types.String,
        required: true, 
    }],
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    resume: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    picture : { 
        type: mongoose.Schema.Types.String, 
        required:true
>>>>>>> b0ae3db4142b5fb438a8133e27e2c220395e87f6
    },
  },
  {
    timestamps: true,
  }
);

const ArticleModel = mongoose.model(
  DOCUMENT_NAME,
  articleSchema,
  COLLECTION_NAME
);
export default ArticleModel;
