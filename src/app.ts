import express from "express";
import mongoose from "mongoose";
// import dotenv without this not working env file
import dotenv from "dotenv";
import { ConnectDb } from "./db/db";
import ReaderRouter from "./routes/reader.routes";
import rootRouter from "./routes/routes";
import { ErrorHandler } from "./middleware/errorHandeler";

//config the dotenv file
dotenv.config();
//assign express backend
const app = express();

//convert fr req to json to identify
app.use(express.json());

app.use("/api", rootRouter);

app.use(ErrorHandler)

const PORT = process.env.SERVER_PORT;

ConnectDb().then(() => {
  app.listen(PORT || 3000, () => {
    console.log(`Server is running  ${PORT}`);
  });
});
