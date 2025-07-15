import express from "express";
import { IssueBook, returnBook } from "../controllers/issueBookController";

const IssueBookRouter = express.Router();

IssueBookRouter.post("/", IssueBook);

IssueBookRouter.post("/return/:id", returnBook);

export default IssueBookRouter;
