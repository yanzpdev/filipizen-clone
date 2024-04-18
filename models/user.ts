import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    accProvider: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
    },
    lgu: {
      type: String,
    },
    mobileNum: {
      type: String,
    },
    isFirstTimeSigningIn: {
      type: Boolean,
      required: true
    },
    // THIS IS FOR IMAGE / BLOB
    // image: {
    //   type: Buffer,
    //   required: true
    // }
  },
  { timestamps: true }
);

const User = models.User || mongoose.model('User', userSchema); 
export default User;