import mongoose, { Schema, models } from "mongoose";


const AdminActivitySchema = new Schema(

  {

    admin: {

      type: Schema.Types.ObjectId,

      ref:"User",

      required:true,

    },


    action: {

      type:String,

      required:true,

    },


    article: {

      type: Schema.Types.ObjectId,

      ref:"Article",

    },


    details: {

      type:String,

      default:"",

    },


    ipAddress: {

      type:String,

      default:"",

    },


  },


  {

    timestamps:true,

  }

);



const AdminActivity =
  models.AdminActivity ||
  mongoose.model(
    "AdminActivity",
    AdminActivitySchema
  );


export default AdminActivity;