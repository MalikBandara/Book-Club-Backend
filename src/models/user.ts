import mongoose from "mongoose";
import { CounterModel } from "./counter";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const userSchema = new mongoose.Schema<User>({
  id: {
    type: String,
    unique: true,
  },
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

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await CounterModel.findOneAndUpdate(
      { model: "User" },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );
    const formattedId = `U${String(counter.count).padStart(3, "0")}`;
    this.id = formattedId;
  }
  next();
});

userSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    delete ret._id;
    delete ret.__v;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
