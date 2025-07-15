
import express from 'express'
import ReaderRouter from './reader.routes'
import BookRouter from './book.routes'
import IssueBookRouter from './issueBook.routes'



const rootRouter = express.Router()

rootRouter.use("/reader" , ReaderRouter)
rootRouter.use("/book" , BookRouter)
rootRouter.use("/issueBook", IssueBookRouter)

export default rootRouter