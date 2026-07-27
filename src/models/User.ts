import mongoose, { Schema, model, models } from "mongoose";


const UserSchema = new Schema(

  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },


    lastName: {
      type: String,
      required: true,
      trim: true,
    },


    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },


    password: {
      type: String,
      required: true,
    },


    role: {
      type: String,
      enum: [
        "writer",
        "admin"
      ],
      default: "writer",
    },


    image: {
      type: String,
      default: "",
    },

  },

  {
    timestamps: true,
  }

);



const User =
  models.User ||
  model(
    "User",
    UserSchema
  );


export default User;