import dayjs from "dayjs";

import { emailTemplates } from "./email.template.js";
import { EMAIL_ADDRESS } from "../config/env.js";
import transporter from "../config/nodemailer.js";

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) throw new Error("Missing required fields");

  const template = emailTemplates.find((t) => t.label === type);

  if (!template) throw new Error("Invalid email type");

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethod,
  }

  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: EMAIL_ADDRESS,
    to,
    subject,
    html: message,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log('Error sending email:', error);

    console.log('Email sent:', info.response);
  })
}