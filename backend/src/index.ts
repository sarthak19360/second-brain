import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", authRoutes);

app.listen(3000, () => {
  console.log("Server is listening on port 3000!");
});
