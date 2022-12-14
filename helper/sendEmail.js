import sendmailer from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const [email, API_KEY, name] = [
  "EASY_SEARCH_EMAIL",
  "API_KEY",
  "DISPLAYED_NAME",
].map((e) => process.env[e]);

sendmailer.setApiKey(API_KEY);

const sendEmail = async (params) => {
  console.log("params", params);
  const { to, subject, html } = params;

  const message = { from: { name, email }, to, subject, html };

  try {
    const msgSent = await sendmailer.send(message);
    if (msgSent) {
      console.log({ status: "success", mail_res: "Email sent successfully!" });
    } else {
      console.log({ status: "fail", mail_res: "Sorry, Please try again!" });
    }
  } catch (error) {
    console.log({ status: "fail", mail_res: error.message });
  }
};

export default sendEmail;
