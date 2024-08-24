import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  authProvider: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  image: {
    type: String,
  },
});

export const User = mongoose.models?.User || mongoose.model("User", UserSchema);
