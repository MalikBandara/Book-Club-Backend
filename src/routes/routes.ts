
import express from 'express'
import ReaderRouter from './reader.routes'
import BookRouter from './book.routes'



const rootRouter = express.Router()

rootRouter.use("/reader" , ReaderRouter)
rootRouter.use("/book" , BookRouter)

export default rootRouter