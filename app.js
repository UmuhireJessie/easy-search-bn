import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { cloudinaryConfig } from "./middlewares/upload.js";
import orgRouter from "./routes/orgs.js";
import declareRouter from "./routes/declare.js";
import docRouter from "./routes/document.js";


const port = process.env.PORT || "3001";
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cloudinaryConfig);


app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use("/api/orgs", orgRouter);
app.use("/api/declare", declareRouter);
app.use("/api/document", docRouter);

app.all("*", (req, res) => {
  return res.sendStatus(404);
});
app.listen(port, () => {
  console.log(`API Running on Port ${port}`);
});

try {
  console.log("Connecting to MongoDB Atlas cluster...");
  mongoose.connect(process.env.MONGOURL, {
    useUnifiedTopology: true,
    socketTimeoutMS: 75000,
  });
  console.log("Successfully connected to MongoDB Atlas!");
} catch (error) {
  console.error("Connection to MongoDB Atlas failed!", error);
  process.exit();
}

export default app;
