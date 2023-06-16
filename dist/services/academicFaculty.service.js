"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAcademicFaculty = exports.editAcademicFaculty = exports.singleAcademicFaculty = exports.allAcademicFaculties = exports.newAcademicFaculty = void 0;
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
var academicFaculty_1 = require("constants/academicFaculty");
var academicFaculty_model_1 = __importDefault(require("models/academicFaculty.model"));
var pagination_1 = __importDefault(require("utils/pagination"));
var newAcademicFaculty = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, academicFaculty_model_1.default.create(payload)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.newAcademicFaculty = newAcademicFaculty;
var allAcademicFaculties = function (filters, paginationOptions) { return __awaiter(void 0, void 0, void 0, function () {
    var searchTerm, filtersData, _a, page, limit, skip, sortBy, sortOrder, andConditions, sortConditions, whereConditions, result, total;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                searchTerm = filters.searchTerm, filtersData = __rest(filters, ["searchTerm"]);
                _a = (0, pagination_1.default)(paginationOptions), page = _a.page, limit = _a.limit, skip = _a.skip, sortBy = _a.sortBy, sortOrder = _a.sortOrder;
                andConditions = [];
                if (searchTerm) {
                    andConditions.push({
                        $or: academicFaculty_1.facultySearchableFields.map(function (field) {
                            var _a;
                            return (_a = {},
                                _a[field] = {
                                    $regex: searchTerm,
                                    $options: 'i',
                                },
                                _a);
                        }),
                    });
                }
                if (Object.keys(filtersData).length) {
                    andConditions.push({
                        $and: Object.entries(filtersData).map(function (_a) {
                            var _b;
                            var field = _a[0], value = _a[1];
                            return (_b = {},
                                _b[field] = value,
                                _b);
                        }),
                    });
                }
                sortConditions = {};
                if (sortBy && sortOrder) {
                    sortConditions[sortBy] = sortOrder;
                }
                whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
                return [4 /*yield*/, academicFaculty_model_1.default.find(whereConditions)
                        .sort(sortConditions)
                        .skip(skip)
                        .limit(limit)];
            case 1:
                result = _b.sent();
                return [4 /*yield*/, academicFaculty_model_1.default.countDocuments()];
            case 2:
                total = _b.sent();
                return [2 /*return*/, {
                        meta: {
                            page: page,
                            limit: limit,
                            total: total,
                        },
                        data: result,
                    }];
        }
    });
}); };
exports.allAcademicFaculties = allAcademicFaculties;
var singleAcademicFaculty = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, academicFaculty_model_1.default.findById(id)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.singleAcademicFaculty = singleAcademicFaculty;
var editAcademicFaculty = function (id, payload) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, academicFaculty_model_1.default.findOneAndUpdate({ _id: id }, payload, {
                    new: true,
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.editAcademicFaculty = editAcademicFaculty;
var removeAcademicFaculty = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, academicFaculty_model_1.default.findByIdAndDelete(id)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.removeAcademicFaculty = removeAcademicFaculty;
