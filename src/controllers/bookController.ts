import { NextFunction, Response, Request } from "express";
import BookModel from "../models/book";
import { ApiError } from "../errors/apiError";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Optional: Manually check if ISBN already exists (safe if not auto-generated)
    if (req.body.isbn) {
      const existingBook = await BookModel.findOne({ isbn: req.body.isbn });
      if (existingBook) {
        throw new ApiError(400, "ISBN already exists");
      }
    }

    const book = new BookModel(req.body);
    await book.save();

    res.status(201).json({ message: "New Book added Successfully", book });
  } catch (error: any) {
    // Handle duplicate key error thrown by MongoDB
    if (error.code === 11000 && error.keyPattern?.isbn) {
      next(new ApiError(400, "ISBN already exists"));
    } else {
      next(error);
    }
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await BookModel.find();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.id) {
      throw new ApiError(404, "Book ID is required");
    }
    const updatedBook = await BookModel.findOneAndUpdate(
      { id: String(req.params.id) },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedBook) {
      throw new ApiError(404, "Book not found");
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const getOneBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const oneBook = await BookModel.findOne({ id: String(req.params.id) });

    if (!oneBook) {
      throw new ApiError(404, "Book not found");
    }
    res.status(200).json(oneBook);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.id) {
      throw new ApiError(404, "Book id can't find");
    }

    const deletedBook = await BookModel.findOneAndDelete({
      id: String(req.params.id),
    });

    res
      .status(200)
      .json({ message: "Book successfully deleted ", deletedBook });
  } catch (error) {
    next(error);
  }
};
