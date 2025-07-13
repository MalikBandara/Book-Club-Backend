import express from "express";
import { createReader, deleteReader, getReaderById, getReaders, updateReader } from "../controllers/readerControler";

const ReaderRouter = express.Router();

ReaderRouter.post("/", createReader);

ReaderRouter.get("/" , getReaders)

ReaderRouter.put("/:id" , updateReader)

ReaderRouter.delete("/:id" , deleteReader)

ReaderRouter.get("/:id" , getReaderById)

export default ReaderRouter;
