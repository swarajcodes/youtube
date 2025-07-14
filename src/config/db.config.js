import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

export const connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.info(`MongoDB is connected at :${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error while connecting to MongoDB`);
  }
};
