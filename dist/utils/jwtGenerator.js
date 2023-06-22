"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
const jsonwebtoken_1 = require("jsonwebtoken");
const createToken = (payload, secret, expireTime) => (0, jsonwebtoken_1.sign)(payload, secret, {
    expiresIn: expireTime,
});
exports.default = createToken;
