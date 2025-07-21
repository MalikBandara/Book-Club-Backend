import express from "express";
import { createReader, deleteReader,  getReaderById, getReaders, updateReader } from "../controllers/readerControler";
import { authenticateToken } from "../middleware/authenticateToken";

const ReaderRouter = express.Router();

ReaderRouter.use(authenticateToken)

ReaderRouter.post("/", createReader);

ReaderRouter.get("/" , getReaders)

ReaderRouter.put("/:id" , updateReader)

ReaderRouter.delete("/:id" , deleteReader)

ReaderRouter.get("/:id" , getReaderById)

// ReaderRouter.get("/:id/borrowedBooks", getBorrowedBookByReader);
export default ReaderRouter;
