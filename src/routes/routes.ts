
import express from 'express'
import ReaderRouter from './reader.routes'



const rootRouter = express.Router()

rootRouter.use("/reader" , ReaderRouter)

export default rootRouter