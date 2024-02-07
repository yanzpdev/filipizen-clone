import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobilenum: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const customUser = models.User || mongoose.model('User', userSchema); 
export default customUser;