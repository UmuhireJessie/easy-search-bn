import { Declare } from "../models/declare.js";




// create a new user
export const declareDoc = async (req, res) => {



  try {
   
    const Obj = new Declare({
      names: req.body.names,
      location: req.body.location,
      email: req.body.email,
      phone: req.body.phone,
      cardNumber: req.body.cardNumber,
      cardType: req.body.cardType
    });
    const dec = await Declare.create(Obj);
    res.status(201).json({ success: true, data :{message: "Submitted successfully"} });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      success: false,
      data: { message: error.properties },
    });
  }
};


export const getMissingDocs = async (req, res) => {
    const missingDocs = await Declare.find();
    res.status(200).json({ success: true, data: missingDocs });
  };

