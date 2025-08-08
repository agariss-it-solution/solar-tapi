const nodemailer = require("nodemailer");

const sendEmail = async ({ from, to, subject, html }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        const mailOptions = {
            from,
            to,
            subject,
            html,
            replyTo: from,
        };

        const info = await transporter.sendMail(mailOptions);
        // console.log("Email sent: ", info.response);
        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
};

module.exports = sendEmail;
