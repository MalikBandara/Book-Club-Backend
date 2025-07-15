import mongoose, { mongo } from "mongoose"
import { CounterModel } from "./counter";

type IssueBook  = {
    id : string , 
    reader : string , 
    book : string,
    lendingDate : Date , 
    dueDate : Date

}


const issueBook = new mongoose.Schema<IssueBook>(
  {
    id : {
        type :String,
        unique : true
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
    lendingDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
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