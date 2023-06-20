"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line prettier/prettier, max-len, consistent-return
const validateRequest = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
            cookies: req.cookies,
        });
        return next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = validateRequest;
