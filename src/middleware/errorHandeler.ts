import { NextFunction , Response , Request } from "express";
import mongoose from "mongoose";
import { ApiError } from "../errors/apiError";

export const ErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

    // multiple errors send krana ek prevent krnv 
    
    if(res.headersSent){
        return next(error)
    }

    if (error instanceof mongoose.Error){
        res.status(400).json({message : error.message});
        return
    }

    if(error instanceof ApiError){
        res.status(error.status).json({message :error.message})
        return 
    }
    res.status(500).json({message : "Internal server error"})



};
