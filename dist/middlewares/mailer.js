import { createTransport } from "nodemailer";
const user = process.env.SENDER_MAIL;
const pass = process.env.MAIL_PWD;
export const mailSender = createTransport({
    service: "Gmail",
    auth: {
        user: user,
        pass: pass
    }
});