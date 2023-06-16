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
exports.deleteAcademicFaculty = exports.updateAcademicFaculty = exports.getSingleAcademicFaculty = exports.getAllAcademicFaculties = exports.createAcademicFaculty = void 0;
/* eslint-disable comma-dangle */
var academicFaculty_1 = require("constants/academicFaculty");
var pagination_1 = __importDefault(require("constants/pagination"));
var http_status_1 = __importDefault(require("http-status"));
var academicFaculty_service_1 = require("services/academicFaculty.service");
var catchAsync_1 = __importDefault(require("utils/catchAsync"));
var pick_1 = __importDefault(require("utils/pick"));
var sendResponse_1 = __importDefault(require("utils/sendResponse"));
exports.createAcademicFaculty = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var facultyData, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                facultyData = __rest(req.body, []);
                return [4 /*yield*/, (0, academicFaculty_service_1.newAcademicFaculty)(facultyData)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.default)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'Academic Faculty created successfully!',
                    data: result,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getAllAcademicFaculties = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filters, paginationOptions, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filters = (0, pick_1.default)(req.query, academicFaculty_1.facultyFilterableFields);
                paginationOptions = (0, pick_1.default)(req.query, pagination_1.default);
                return [4 /*yield*/, (0, academicFaculty_service_1.allAcademicFaculties)(filters, paginationOptions)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.default)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'Academic Faculties data retrieved successfully!',
                    meta: result.meta,
                    data: result.data,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getSingleAcademicFaculty = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, academicFaculty_service_1.singleAcademicFaculty)(id)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.default)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'Academic Faculty fetched successfully',
                    data: result,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.updateAcademicFaculty = (0, catchAsync_1.default)((0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updatedData, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                updatedData = req.body;
                return [4 /*yield*/, (0, academicFaculty_service_1.editAcademicFaculty)(id, updatedData)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.default)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'Academic Faculty updated successfully!',
                    data: result,
                });
                return [2 /*return*/];
        }
    });
}); }));
exports.deleteAcademicFaculty = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, academicFaculty_service_1.removeAcademicFaculty)(id)];
            case 1:
                result = _a.sent();
                (0, sendResponse_1.default)(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: 'Academic Faculty deleted successfully!',
                    data: result,
                });
                return [2 /*return*/];
        }
    });
}); });
