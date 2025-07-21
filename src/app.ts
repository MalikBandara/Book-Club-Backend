import express from "express";
import mongoose from "mongoose";
// import dotenv without this not working env file
import dotenv from "dotenv";
import { ConnectDb } from "./db/db";
import ReaderRouter from "./routes/reader.routes";
import rootRouter from "./routes/routes";
import cookieParser from "cookie-parser";
import { ErrorHandler } from "./middleware/errorHandeler";
import cors from "cors";

//config the dotenv file
dotenv.config();
//assign express backend
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET,HEAD, PUT,POST,DELETE,PATCH,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

//convert fr req to json to identify
app.use(express.json());
app.use(cookieParser());

app.use("/api", rootRouter);

app.use(ErrorHandler);

const PORT = process.env.SERVER_PORT;

ConnectDb().then(() => {
  app.listen(PORT || 3000, () => {
    console.log(`Server is running  ${PORT}`);
  });
});
