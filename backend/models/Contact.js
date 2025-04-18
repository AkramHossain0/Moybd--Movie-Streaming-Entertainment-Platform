import mongoose from "mongoose";

const ContactModal = new mongoose.Schema({
    name: { type: String, },
    email: { type: String, },
    Subject: { type: String, },
    message: { type: String, }
}); 

const Contact = mongoose.model("contact", ContactModal);

export default Contact;