const Contact = require("../models/contact");
const transporter = require("../config/mailer");

const submitContactForm = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      serviceType,
      eventDate,
      message,
    } = req.body;

     // validation
    if(!name || !email || !phone ){
        return res.status(400).json({
            success:false,
            message:"Name, email, and phone are required"
        })
    }

    // Save to MongoDB

    // email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
        return res.status(400).json({
            success:false,
            message:"Invalid email address"
        })
    }
    const contact = await Contact.create({
      name,
      email,
      phone,
      serviceType,
      eventDate,
      message,
    });

    // Email to Owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,

      subject: `New ${serviceType} Enquiry`,

      html: `
        <h2>New Photography Enquiry</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${serviceType}</p>

        <p><strong>Event Date:</strong> ${
          eventDate
            ? new Date(eventDate).toLocaleDateString()
            : "Not Provided"
        }</p>

        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Auto Reply to Client
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,

      subject: "We received your enquiry",

      html: `
        <h2>Thank you for contacting Harsh Photography</h2>

        <p>Hello ${name},</p>

        <p>
          We have successfully received your enquiry
          regarding <strong>${serviceType}</strong>.
        </p>

        <p>
          Our team will review your request and
          contact you shortly.
        </p>

        <p>Thank you for choosing Harsh Photography.</p>
      `,
    });

   

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: contact,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
        success:false,
        message:"Server Error. Please try again later."
    })

    
    }
  }


module.exports = {
  submitContactForm,
};