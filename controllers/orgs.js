import { Org } from "../models/orgs.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// create a new user
export const createOrg = async (req, res) => {
  const email = req.body.email;

  try {
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const Obj = new Org({
      orgName: req.body.orgName,
      location: req.body.location,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });
    const org = await Org.create(Obj);
    res
      .status(201)
      .json({
        success: true,
        data: { message: "Your organisation successfully registed", Obj },
      });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      data: { message: error.message },
    });
  }
};

// login a user
export const loginOrg = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const org = await Org.findOne({ email: email });

  if (!org) {
    return res.status(400).json({
      success: false,
      data: { message: "Incorrect email or password" },
    });
  }

  const isMatch = await bcrypt.compare(password, org.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      data: { message: "Incorrect email or password" },
    });
  }

  // generating token
  let authToken = jwt.sign(
    { email: org.email, id: org._id },
    process.env.AUTH_KEY,
    { expiresIn: "1h" }
  );

  // send json response
  res.status(200).json({
    success: true,
    data: {
      message: "successfully logged in",
      _id: org._id,
      email: req.body.email
    },
    token: authToken,
  });
};

// Get all registered organisation
export const getAllOrganisation = async (req, res) => {
  try {
    const allOrg = await Org.find();
    return res.status(200).json({
      success: true,
      data: { allOrg },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      data: { error: error.message },
    });
  }
};
