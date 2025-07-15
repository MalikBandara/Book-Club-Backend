import express from "express"
import { IssueBook } from "../controllers/issueBookController"


const IssueBookRouter = express.Router()

IssueBookRouter.post("/" , IssueBook)



export default IssueBookRouter