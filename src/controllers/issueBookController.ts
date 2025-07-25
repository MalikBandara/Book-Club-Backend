import IssueBookModel from "../models/issueBook";
import BookModel from "../models/book";
import ReaderModel from "../models/reader";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/apiError";

export const IssueBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { book, reader, bookTitle, readerName, dueDate, status } = req.body;

    // const currentDate = new Date();
    // const parsedDueDate = new Date(dueDate);
    // if (parsedDueDate <= currentDate) {
    //   return res.status(400).json({
    //     message: "Due date must be after the issue (current) date",
    //   });
    // }

    //  Find Book by `id: B001`
    const foundBook = await BookModel.findOne({ id: book });
    if (!foundBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (foundBook.status === "Issued") {
      return res.status(400).json({ message: "Book already issued" });
    }

    // Find Reader by
    const foundReader = await ReaderModel.findOne({ id: String(reader) });
    if (!foundReader) {
      return res.status(404).json({ message: "Reader not found" });
    }

    //  Create the issue record with ObjectId references
    const issue = new IssueBookModel({
      book: foundBook.id,
      reader: foundReader.id,
      dueDate,
      status: status || "pending", // Default to "pending" if not provided
      readerName: readerName || foundReader.name,
      readerEmail: foundReader.email,
      bookTitle: bookTitle || foundBook.title,
    });

    await issue.save();

    //  Update book status
    foundBook.status = "Issued";
    await foundBook.save();

    res.status(201).json({
      message: "Book issued successfully",
      issue,
    });
  } catch (err) {
    next(err);
  }
};

export const getIssueBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isBook = await IssueBookModel.find();

    if (!isBook || isBook.length === 0) {
      throw new ApiError(404, "No IssuedBooks found !!!");
    }
    res.status(200).json(isBook);
  } catch (error: any) {
    next(error);
  }
};

//return book

export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // 1. Find the book by its custom ID (like B001)
    const returnToBeBook = await BookModel.findOne({ id });

    if (!returnToBeBook) {
      throw new ApiError(404, "Book not found to return");
    }

    if (returnToBeBook.status === "Available") {
      return res.status(400).json({ message: "Book already returned" });
    }

    // 2. Find the latest issue record for this book
    const latestIssue = await IssueBookModel.findOne({
      book: id,
      status: { $in: ["pending", "overdue"] },
    }).sort({ createdAt: -1 });

    if (!latestIssue) {
      return res.status(404).json({ message: "No active issue record found" });
    }

    // 3. Check if the book is overdue based on dueDate
    const today = new Date();
    const dueDate = new Date(latestIssue.dueDate);

    if (dueDate < today && latestIssue.status === "pending") {
      return res.status(400).json({
        message:
          "This book is overdue.",
      });
    }

    // 4. Update book status to Available
    returnToBeBook.status = "Available";
    await returnToBeBook.save();

    // 5. Mark the issue record as returned
    latestIssue.status = "returned";
    await latestIssue.save();

    return res.status(200).json({
      message: "Book returned successfully",
      book: returnToBeBook,
      updatedIssue: latestIssue,
    });
  } catch (error) {
    next(error);
  }
};


export const getOverdueReaders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date();

    // Find all overdue issue records
    const overdueIssues = await IssueBookModel.find({
      dueDate: { $lt: today },
      status: "pending",
    });

    if (overdueIssues.length === 0) {
      return res.status(404).json({ message: "No overdue readers found" });
    }

    res.status(200).json(overdueIssues);
  } catch (error) {
    next(error);
  }
};

export const updateOverdueStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const response = await IssueBookModel.findOneAndUpdate(
      { id },
      { status: "overdue" },
      { new: true, runValidators: true }
    );
    return res
      .status(200)
      .json({ message: "Overdue status updated successfully" });
  } catch (error) {
    next(error);
  }
};
