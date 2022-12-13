import documentSchema from "../models/document.js";
import { Org } from "../models/orgs.js";

// Adding new missing documents
const addDocument = async (req, res) => {
  try {
    const ownerId = req.params.id;
    const {
      nameOnDoc,
      cardType,
      cardNumber,
      location,
      phoneEMail,
      reqDocument,
    } = req.body;

    if (await documentSchema.findOne({ cardNumber })) {
      return res.status(400).json({
        success: false,
        data: { message: "Document already exist" },
      });
    }

    const newDoc = await documentSchema.create({
      nameOnDoc,
      cardType,
      cardNumber,
      location,
      phoneEMail,
      reqDocument,
      orgDocument: ownerId,
    });

    const organization = await Org.findById(ownerId);
    if (!organization) {
      return res.status(404).json({
        success: false,
        data: { message: `No organisation found with ID: ${ownerId}` },
      });
    }
    organization.documents.push(newDoc);

    await organization.save().then((orgDoc) => {
      return res.status(201).json({
        success: true,
        data: { message: "Document saved successfully" },
      });
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      data: { error: error.message },
    });
  }
};

// getting all documents [This is supposed to seen by the anyone who visits Easy Search]
const getAllDocument = async (req, res) => {
  try {
    const allDocuments = await documentSchema.find();
    return res.status(200).json({
      success: true,
      data: { allDocuments, count: allDocuments.length },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      data: { error: error.message },
    });
  }
};

// getting all documents on the organisation side
const getOrgDocuments = async (req, res) => {
  try {
    const orgId = req.params.id;
    const allOrgDocuments = await Org.findById(orgId).populate("documents");

    return res.status(200).json({
      success: true,
      data: {
        orgName: allOrgDocuments.orgName,
        allDocs: allOrgDocuments.documents,
        count: allOrgDocuments.documents.length,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      data: { error: error.message },
    });
  }
};

// deleting a document
const deleteDocument = async (req, res) => {
  const { OrgId, docId } = req.params;

  try {
    const docTodelete = await documentSchema.findById(docId);
    if (docTodelete) {
      await documentSchema.findByIdAndDelete(docId);
      const org = await Org.findById(OrgId);

      org.documents.remove(docId);
      await org.save();

      return res.status(200).json({
        success: true,
        data: {
          message: "Successfully deleted the document",
        },
      });
    } else {
      return res.status(404).json({
        success: false,
        data: { message: `No document found with this id ${docId}` },
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      data: { error: error.message },
    });
  }
};

// updating the document by the organisation
const updateDocument = async (req, res) => {
  const { OrgId, docId } = req.params;
  try {
    const organization = await Org.findById(OrgId);
    if (!organization) {
      return res.status(404).json({
        success: false,
        data: { message: `No organisation found with ID: ${OrgId}` },
      });
    }

    const docToUpdate = await documentSchema.findById(docId);
    if (docToUpdate) {
      await documentSchema.findByIdAndUpdate(docId, req.body);

      await organization.save();

      return res.status(200).json({
        success: true,
        data: {
          message: "Successfully updated the document",
        },
      });
    } else {
      return res.status(404).json({
        success: false,
        data: { message: `No document found with this id ${docId}` },
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      data: { error: error.message },
    });
  }
};

export { addDocument, getAllDocument, getOrgDocuments, deleteDocument, updateDocument };
