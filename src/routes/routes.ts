import express from "express";
import ReaderRouter from "./reader.routes";
import BookRouter from "./book.routes";
import IssueBookRouter from "./issueBook.routes";
import UserRouter from "./auth.routes";

const rootRouter = express.Router();

rootRouter.use("/reader", ReaderRouter);
rootRouter.use("/book", BookRouter);
rootRouter.use("/issueBook", IssueBookRouter);
rootRouter.use("/auth", UserRouter);

export default rootRouter;
