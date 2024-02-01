import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log('Connected to MongoDB')
    }
  }

  catch (error) {
    console.log('Failed to connect to database: ', error);
  }
}