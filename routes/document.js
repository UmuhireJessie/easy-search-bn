import express from "express";
import { authenticate } from "../middlewares/auth.js";
import {
  addDocument,
  getAllDocument,
  getOrgDocuments,
  deleteDocument,
  updateDocument,
} from "../controllers/document.js";


const docRouter = express.Router();

docRouter.post("/:id", authenticate, addDocument);
docRouter.get("/:id", authenticate, getOrgDocuments);
docRouter.get("/", getAllDocument);
docRouter.delete("/:OrgId/:docId", authenticate, deleteDocument);
docRouter.patch("/:OrgId/:docId", authenticate, updateDocument);

export default docRouter;
