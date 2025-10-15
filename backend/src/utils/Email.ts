import nodemailer, { TransportOptions } from "nodemailer";
import pug from "pug";
import { convert } from "html-to-text";
import {
  EMAIL_HOST,
  EMAIL_PASS,
  EMAIL_PORT,
  MAILTRAP_HOST,
  MAILTRAP_PASSWORD,
  MAILTRAP_PORT,
  MAILTRAP_USERNAME,
  NODE_ENV,
  USER_EMAIL_ADDRESS,
} from "../constants/env.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Email {
  private to: string = "";
  private from: string = "";
  private firstName: string = "";
  private url: string = "";

  constructor(user: { email: string; firstName: string }, url: string) {
    this.to = user.email;
    this.from = "PDFinance <pdfinanceapp@gmail.com>";
    this.firstName = user.firstName;
    this.url = url;
  }

  newTransport() {
    if (NODE_ENV === "production") {
      return nodemailer.createTransport({
        host: EMAIL_HOST,
        port: Number(EMAIL_PORT),
        secure: false, // true for port 465, false for other ports
        auth: {
          user: USER_EMAIL_ADDRESS,
          pass: EMAIL_PASS,
        },
      } as TransportOptions);
    } else {
      return nodemailer.createTransport({
        host: MAILTRAP_HOST,
        port: Number(MAILTRAP_PORT),
        secure: false,
        auth: {
          user: MAILTRAP_USERNAME,
          pass: MAILTRAP_PASSWORD,
        },
      });
    }
  }

  async send(subject: string, template: string) {
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      subject: subject,
      firstName: this.firstName,
      url: this.url,
      email: this.to,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("Verify Email Address", "welcome");
  }

  async sendResetPassword() {
    await this.send("Password Reset Request", "resetPassword");
  }
}
