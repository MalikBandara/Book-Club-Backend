import mongoose from "mongoose";

type User = {
  name: string;
  email: string;
  password: string;
};

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
