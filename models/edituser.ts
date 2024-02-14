import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
    },
    mobileNum: {
      type: String,
    },
    isFirstTimeSigningIn: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

const EditUser = models.User || mongoose.model('EditUser', userSchema); 
export default EditUser;