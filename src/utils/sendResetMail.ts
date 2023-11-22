import envConfig from 'configs/env.config';
import nodemailer from 'nodemailer';

async function sendEmail(to: string, html: string) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: envConfig.email,
            pass: envConfig.appPass,
        },
    });

    await transporter.sendMail({
        from: envConfig.email, // sender address
        to, // list of receivers
        subject: 'Reset Password Link', // Subject line
        html, // html body
    });
}

export default sendEmail;
