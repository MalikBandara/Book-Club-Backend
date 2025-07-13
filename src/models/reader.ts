import mongoose from "mongoose";

type Reader = {
  name: string;
  email: string;
  phone: number;
  address: string;
  isActive: boolean;
  memberShipId: string;
  borrowedBooks: string[];
};

const reader = new mongoose.Schema<Reader>(
  {
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
      type: Number,
      required: [true, "Phone number is required"],
      validate: {
        validator: (v: number) => v.toString().length >= 10,
        message: "Phone number must be at least 10 digits",
      },
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

const ReaderModel = mongoose.model("Reader", reader);

export default ReaderModel;
