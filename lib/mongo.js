import mongoose from "mongoose";
require("dotenv").config();

export async function dbConnect() {
  try {
    const connection = await mongoose.connect(String(process.env.MONGO_URI));
    return connection;
  } catch (error) {
    console.error(error);
  }
}
