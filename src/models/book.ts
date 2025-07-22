import mongoose from "mongoose";
import { CounterModel } from "./counter";

type Book = {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publishDate: Date;
  category: string;
  status: "Available" | "Issued";
};

const book = new mongoose.Schema<Book>(
  {
    id: {
      type: String,
      unique: true,
    },

    // generate isbn automatically
    isbn: {
      type: String,
      unique: true,
      required: true,
      match: [/^\d{10}(\d{3})?$/, "Invalid ISBN format"],
      default: () => {
        const randomDigits = Array.from({ length: 10 }, () =>
          Math.floor(Math.random() * 10)
        ).join("");
        return `978${randomDigits}`;
      },
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [2, "Title must be at least 2 characters"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    publisher: {
      type: String,
      required: [true, "Publisher is required"],
      trim: true,
    },
    publishDate: {
      type: Date,
      required: [true, "Published date is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    status: {
      type: String,
      enum: ["Available", "Issued"],
      default: "Available",
    },
  },
  { timestamps: true }
);

// generate id automatically
book.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await CounterModel.findOneAndUpdate(
      { model: "Book" },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );
    const formattedId = `B${String(counter.count).padStart(3, "0")}`;
    this.id = formattedId;
  }
  next();
});

book.set("toJSON", {
  transform: (_doc, ret: any) => {
    delete ret._id;
    delete ret.__v;
  },
});

const BookModel = mongoose.model("Book", book);

export default BookModel;
