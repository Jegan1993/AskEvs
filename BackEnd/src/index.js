import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./DBConnection/db.js";
import errorMiddleware from "./utils/errorMiddleware.js";
import router from "./routes/index.js"
dotenv.config();
const app = express();
const PORT = process.env.PORT ;
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(errorMiddleware);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});