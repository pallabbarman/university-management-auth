"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = __importDefault(require("../configs/env.config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
async function sendEmail(to, html) {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: env_config_1.default.email,
            pass: env_config_1.default.appPass,
        },
    });
    await transporter.sendMail({
        from: env_config_1.default.email,
        to,
        subject: 'Reset Password Link',
        html, // html body
    });
}
exports.default = sendEmail;
