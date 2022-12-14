import { Declare } from "../models/declare.js";
import documentSchema from "../models/document.js";

// create a new user
export const declareDoc = async (req, res) => {
  try {
    const {names, location, email, phone, cardNumber, cardType } = req.body;
    const Obj = new Declare({
      names,
      location,
      email,
      phone,
      cardNumber,
      cardType,
    });

    const docExist = await documentSchema.findOne({
      $and: [
        { cardNumber: { $eq: cardNumber } },
        { nameOnDoc: { $eq: names } }
      ]
    });
    console.log("docExist", docExist)
    if (docExist) {
      return res
        .status(200)
        .json({ success: false, data: { message: "Please find this document on the available doc page" } });
    }

    const dec = await Declare.create(Obj);
    return res
      .status(201)
      .json({ success: true, data: { message: "Submitted successfully" } });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      data: { message: error.message },
    });
  }
};

export const getMissingDocs = async (req, res) => {
  const missingDocs = await Declare.find();
  res.status(200).json({ success: true, data: missingDocs });
};
