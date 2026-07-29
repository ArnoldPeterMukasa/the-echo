import mongoose, { Schema, models } from "mongoose";

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    excerpt: {
      type: String,
      default: "",
    },

    content: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "draft",
        "pending",
        "published",
      ],
      default: "draft",
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    trending: {
      type: Boolean,
      default: false,
    },

  },
  {
    timestamps: true,
  }
);


export default models.Article ||
  mongoose.model(
    "Article",
    ArticleSchema
  );