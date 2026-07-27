import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const UserSchema = new Schema(

  {

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: [
        "admin",
        "writer",
      ],
      default: "writer",
    },

    image: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

  },

  {
    timestamps: true,
  }

);

export default models.User ||
model(
  "User",
  UserSchema
);