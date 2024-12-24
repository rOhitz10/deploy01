const clientModel = require("../models/clientModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Login user
exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, password } = req.body;

    try {
        if (isNaN(id)) {
            // Search by 'epin' if 'id' is a string
            user = await clientModel.findOne({ epin: id });
        } else {
            // Search by 'number' if 'id' is numeric
            user = await clientModel.findOne({ number: Number(id)})
        }        
        if (!user) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        // Generate a JWT including the sponsorId
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ msg: "Server configuration error" });
        }
        
        const token = jwt.sign(

            { id: user._id, epin: user.epin, sponsorId: user.sponsorId, name:user.name, level:user.level,status:user.activate, role:user.role }, 


            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            msg: "Login successful",
            user: { id: user._id, name: user.name, email: user.email, epin: user.epin },
            token
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ msg: "An error occurred", error: "Internal server error" });
    }
};
 

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Find the user by email
        const user = await clientModel.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        
        
        // Generate a password reset token (expires in 1 hour)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Create a password reset URL
        const resetUrl = `http://localhost:8000/reset-password/${token}`;
        
        // Configure the transporter for sending the email (using Gmail SMTP in this example)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,   // Use environment variables for email and password
                pass: process.env.EMAIL_PASS
            }
        });
        
        // Set up the email data
        const mailOptions = {
            from: process.env.EMAIL_USER,  // Email sender
            to: user.email,               // Send to the user's email address
            subject: 'Password Reset Request',
            text: `You requested a password reset. Please click the link below to reset your password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`
        };
        
        // Send the email
        transporter.sendMail(mailOptions);
        
        console.log(mailOptions,"fdsg4g");
        // Respond to the user
        return res.status(200).json({
            msg: 'Password reset email sent successfully. Please check your inbox.'
        });
        
    } catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({ msg: "An error occurred", error: error.message });
    }
};