import Contact from "../models/Contact.js";
import nodemailer from 'nodemailer';

const NewContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const newContact = new Contact({
            name: name,
            email: email,
            subject: subject,
            message: message
        });

        await newContact.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `From movie Website: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Contact posted successfully and email sent', contact: newContact });

    } catch (error) {
        console.error('Error during post contact', error);
        res.status(500).json({ error: 'Error during post contact' });
    }
};

export { NewContact };