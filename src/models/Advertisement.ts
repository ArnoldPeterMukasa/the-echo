import mongoose, { Schema } from "mongoose";

const AdvertisementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Advertisement ||
  mongoose.model(
    "Advertisement",
    AdvertisementSchema
  );