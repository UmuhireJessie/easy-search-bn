import express from "express";
import { authenticate } from "../middlewares/auth.js";
const orgRouter = express.Router();

import {
  createOrg,
  loginOrg,
} from "../controllers/orgs.js";

orgRouter.post("/", createOrg);
orgRouter.post("/login", loginOrg);


export default orgRouter
