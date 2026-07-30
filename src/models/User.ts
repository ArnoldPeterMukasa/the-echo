import mongoose, { Schema, models } from "mongoose";


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
        "admin",
        "writer",
      ],

      default:"writer",

    },


    bio: {

      type:String,

      default:"",

    },


    image: {

      type:String,

      default:"",

    },


  },

  {
    timestamps:true,
  }

);



const User =
  models.User ||
  mongoose.model(
    "User",
    UserSchema
  );



export default User;