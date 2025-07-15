import IssueBookModel from "../models/issueBook";
import BookModel from "../models/book";
import ReaderModel from "../models/reader";
import { Request, Response, NextFunction } from "express";

export const IssueBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { book, reader, dueDate } = req.body;

    //  Find Book by `id: B001`
    const foundBook = await BookModel.findOne({ id: book });
    if (!foundBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (foundBook.status === "Borrowed") {
      return res.status(400).json({ message: "Book already borrowed" });
    }

    // Find Reader by `id: 5`
    const foundReader = await ReaderModel.findOne({ id: String(reader) });
    if (!foundReader) {
      return res.status(404).json({ message: "Reader not found" });
    }

    //  Create the issue record with ObjectId references
    const issue = new IssueBookModel({
      book: foundBook.id,
      reader: foundReader.id,
      dueDate,
    });

    await issue.save();

    //  Update book status
    foundBook.status = "Borrowed";
    await foundBook.save();

    res.status(201).json({
      message: "Book issued successfully",
      issue,
    });
  } catch (err) {
    next(err);
  }
};
