import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getOneBook,
  updateBook,
} from "../controllers/bookController";
import { returnBook } from "../controllers/issueBookController";
import { authenticateToken } from "../middleware/authenticateToken";


const BookRouter = express.Router();

BookRouter.use(authenticateToken)

BookRouter.post("/", createBook);

BookRouter.get("/", getAllBooks);

BookRouter.put("/:id", updateBook);

BookRouter.get("/:id", getOneBook);

BookRouter.delete("/:id" , deleteBook)



export default BookRouter;
