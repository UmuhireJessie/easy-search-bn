import express from "express";
import { authenticate } from "../middlewares/auth.js";
const orgRouter = express.Router();

import {
  createOrg,
  loginOrg,
  logout,
  getAllOrganisation
} from "../controllers/orgs.js";

orgRouter.post("/", createOrg);
orgRouter.post("/login", loginOrg);
orgRouter.post("/logout", logout);
orgRouter.get("/", getAllOrganisation);


export default orgRouter
