import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getOneBook,
  updateBook,
} from "../controllers/bookController";


const BookRouter = express.Router();

BookRouter.post("/", createBook);

BookRouter.get("/", getAllBooks);

BookRouter.put("/:id", updateBook);

BookRouter.get("/:id", getOneBook);

BookRouter.delete("/:id" , deleteBook)

export default BookRouter;
