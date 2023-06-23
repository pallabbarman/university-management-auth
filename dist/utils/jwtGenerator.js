"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
const jsonwebtoken_1 = require("jsonwebtoken");
const createToken = (payload, secret, expireTime) => (0, jsonwebtoken_1.sign)(payload, secret, {
    expiresIn: expireTime,
});
exports.createToken = createToken;
const verifyToken = (token, secret) => (0, jsonwebtoken_1.verify)(token, secret);
exports.verifyToken = verifyToken;
