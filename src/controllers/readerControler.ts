import { NextFunction, Request, Response } from "express";
import ReaderModel from "../models/reader";
import { ApiError } from "../errors/apiError";
import mongoose from "mongoose";

// create reader
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

// get all readers
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

//update reader
export const updateReader = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedReader = await ReaderModel.findOneAndUpdate(
      { id: String(req.params.id) },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedReader) {
      throw new ApiError(404, "Reader not found");
    }
    res.status(200).json({ message: "Reader Updated Successfully " });
  } catch (error: any) {
    next(error);
  }
};

// delete reader
export const deleteReader = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedReader = await ReaderModel.findOneAndDelete({
      id: String(req.params.id),
    });
    if (!deletedReader) {
      throw new ApiError(404, "Reader not found");
    }
    res.status(200).json({ message: "Reader Deleted Successfully" });
  } catch (error: any) {
    next(error);
  }
};

// get reader by id
export const getReaderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const oneReader = await ReaderModel.findOne({ id: String(req.params.id) });

    if (!oneReader) {
      throw new ApiError(404, "Reader not found");
    }

    res.status(200).json(oneReader);
  } catch (error: any) {
    next(error);
  }
};
