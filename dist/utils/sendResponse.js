"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sendResponse = function (res, data) {
    var responseData = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        meta: data.meta || null || undefined,
        data: data.data || null,
    };
    res.status(data.statusCode).json(responseData);
};
exports.default = sendResponse;
