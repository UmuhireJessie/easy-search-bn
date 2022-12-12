import { Org } from "../models/orgs.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"



// create a new user
export const createOrg = async (req, res) => {
  const email = req.body.email;

  // const existingOrg = await Org.findOne({ email: email });

  // if (existingOrg) {
  //   return res.status(409).json({
  //     success: false,
  //     data: { message: "An organisation with this email already exist" },
  //   });
  // }

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
    res.status(201).json({ success: true, data :{message: "Your organisation successfully registed"} });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      success: false,
      data: { message: error.properties },
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
      data: { message: "No organisation with this email exists" },
    });
  }

  const isMatch = await bcrypt.compare(password, org.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      data: { message: "Incorrect password" },
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
    data: {message: "successfully logged in",
          email: req.body.email},
    token: authToken,
  });
};

