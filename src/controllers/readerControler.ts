import { NextFunction, Request, Response } from "express";
import ReaderModel from "../models/reader";
import { ApiError } from "../errors/apiError";

export const createReader = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const reader = new ReaderModel(req.body);
    await reader.save();
    resp.status(201).json(reader);
  } catch (error: any) {
    next(error);
  }
};

export const getReaders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reader = await ReaderModel.find();
    res.status(200).json(reader);
  } catch (error: any) {
    next(error);
  }
};

export const updateReader = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedReader = await ReaderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedReader) {
      throw new ApiError(404, "Reader not found");
    }
    res.status(200).json("Reader Updated Successfully ");
  } catch (error: any) {
    next(error);
  }
};

export const deleteReader = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedReader = await ReaderModel.findByIdAndDelete(req.params.id);
    if (!deletedReader) {
      throw new ApiError(404, "Reader not found");
    }
    res.status(200).json({ message: "Reader Deleted Successfully" });
  } catch (error : any) {
    next(error);
  }
};

export const getReaderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const oneReader = await ReaderModel.findById(req.params.id);

    if (!oneReader) {
      throw new ApiError(404, "Reader not found");
    }

    res.status(200).json(oneReader);
  } catch (error: any) {
    next(error);
  }
};
