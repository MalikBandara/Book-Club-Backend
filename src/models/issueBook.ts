import mongoose, { mongo } from "mongoose"
import { CounterModel } from "./counter";

type IssueBook  = {
    id : string , 
    reader : string , 
    book : string,
    readerName?: string, // Optional field to store reader's name
    bookTitle?: string, // Optional field to store book title
    readerEmail?: string, // Optional field to store reader's email
    lendingDate : Date , 
    dueDate : Date,
    status? :string

}


const issueBook = new mongoose.Schema<IssueBook>(
  {
    id: {
      type: String,
      unique: true,
    },
    book: {
      type: String,
      ref: "Book",
      required: true,
    },
    reader: {
      type: String,
      ref: "Reader",
      required: true,
    },
    readerName: {
      type: String,
      ref: "Reader",
      required: false, // Optional field
    },
    readerEmail: {
      type: String,
      ref: "Reader",
      required: false, // Optional field
    },
    bookTitle: {
      type: String,
      ref: "Book",
      required: false, // Optional field
    },
    lendingDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "pending", // ✅ Default status set here
    },
  },
  { timestamps: true }
);


// generate id automatically 
issueBook.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await CounterModel.findOneAndUpdate(
      { model: "IssueBook" },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );
    const formattedId = `IB${String(counter.count).padStart(3, "0")}`;
    this.id = formattedId;
  }
  next();
});

issueBook.set("toJSON", {
  transform: (_doc, ret: any) => {
    delete ret._id;
    delete ret.__v;
  },
});


const IssueBookModel =  mongoose.model("IssueBook", issueBook);

export default IssueBookModel