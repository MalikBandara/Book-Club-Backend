import mongoose from "mongoose";
import { CounterModel } from "./counter";

type Reader = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
  memberShipId: string;
  borrowedBooks: string[];
};

const reader = new mongoose.Schema<Reader>(
  {
    id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      lowercase: true,
      trim: true,
      match: [
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: (v: string) => /^\d{10}$/.test(v),
        message: "Phone number must be exactly 10 digits",
      },
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      minlength: [5, "Address must be at least 5 characters long"],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    memberShipId: {
      type: String,
      required: [true, "Membership ID is required"],
      trim: true,
    },
    borrowedBooks: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

reader.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await CounterModel.findOneAndUpdate(
      { model: "Reader" },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );
    const formattedId = `R${String(counter.count).padStart(3, "0")}`;
    this.id = formattedId;
  }
  next();
});

reader.set("toJSON", {
  transform: (_doc, ret: any) => {
    delete ret._id;
    delete ret.__v;
  },
});

const ReaderModel = mongoose.model("Reader", reader);

export default ReaderModel;
