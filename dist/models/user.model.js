"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable comma-dangle */
const bcrypt_1 = require("bcrypt");
const env_config_1 = __importDefault(require("../configs/env.config"));
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    needsChangePassword: {
        type: Boolean,
        required: true,
        default: true,
    },
    passwordChangedAt: {
        type: Date,
    },
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Student',
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Faculty',
    },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Admin',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
userSchema.methods.isUserExist = async function (id) {
    const user = await User.findOne({ id }, {
        id: 1,
        password: 1,
        role: 1,
        needsChangePassword: 1,
    });
    return user;
};
userSchema.methods.isPasswordMatched = async function (givenPassword, savedPassword) {
    const isMatched = await (0, bcrypt_1.compare)(givenPassword, savedPassword);
    return isMatched;
};
userSchema.pre('save', async function (next) {
    this.password = await (0, bcrypt_1.hash)(this.password, Number(env_config_1.default.bcrypt_salt_round));
    if (!this.needsChangePassword) {
        this.passwordChangedAt = new Date();
    }
    next();
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
