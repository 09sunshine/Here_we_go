import nodemailer from "nodemailer";

const sendConfirmationEmail = async (to, name, event) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "Event Registration Confirmation",
        text: `Hello ${name},

Your registration for "${event.title}" is confirmed!

Event Details:
Description: ${event.description}
Date: ${event.date.toDateString()}
Time: ${event.time}
Location: ${event.location}

Thank you for registering!`,
    };

    await transporter.sendMail(mailOptions);
};

export {sendConfirmationEmail}