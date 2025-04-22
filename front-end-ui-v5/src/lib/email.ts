import  nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SEVER_SMTP_HOST || "localhost",              // MailHog SMTP server
    port: parseInt(process.env.MAIL_SEVER_SMTP_PORT || "1025", 10),     // MailHog SMTP port
    secure: process.env.MAIL_SEVER_SECURE == "true",                    // No SSL/TLS for MailHog in this case
});

