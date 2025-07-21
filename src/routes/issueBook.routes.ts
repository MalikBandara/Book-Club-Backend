import express from "express";
import {
  getIssueBooks,
  getOverdueReaders,
  IssueBook,
  returnBook,
  updateOverdueStatus,
} from "../controllers/issueBookController";
import { authenticateToken } from "../middleware/authenticateToken";

const IssueBookRouter = express.Router();

IssueBookRouter.use(authenticateToken);

IssueBookRouter.post("/", IssueBook);

IssueBookRouter.post("/return/:id", returnBook);

IssueBookRouter.get("/", getIssueBooks);

IssueBookRouter.get("/overdue", getOverdueReaders);

IssueBookRouter.put("/updateOverdue/:id", updateOverdueStatus);

export default IssueBookRouter;
