"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calculatePagination = function (options) {
    var page = Number(options.page || 1);
    var limit = Number(options.limit || 10);
    var skip = (page - 1) * limit;
    var sortBy = options.sortBy || 'createdAt';
    var sortOrder = options.sortOrder || 'desc';
    return {
        page: page,
        limit: limit,
        skip: skip,
        sortBy: sortBy,
        sortOrder: sortOrder,
    };
};
exports.default = calculatePagination;
