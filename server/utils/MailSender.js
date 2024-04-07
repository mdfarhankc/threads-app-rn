import nodemailer from 'nodemailer';

const SendVerificationEmail = async (email, veriToken) => {
    // create a nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "kcfarhandeveloper@gmail.com",
            pass: "zfbmrckvyzawlcyo",
        }
    });
    // compose email
    const mailOptions = {
        from: "mythreadsapp.com",
        to: email,
        subject: "Email Verification",
        text: `Please click the following link to verify your email- http://localhost:3000/verify/${veriToken}`
    };
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(error, "Send mail");

    }
}

export default SendVerificationEmail;