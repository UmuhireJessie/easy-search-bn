import express from "express";
const declareRouter = express.Router();

import {
    declareDoc,
    getMissingDocs
} from "../controllers/declare.js";

declareRouter.post("/", declareDoc);
declareRouter.get("/", getMissingDocs);


export default declareRouter
