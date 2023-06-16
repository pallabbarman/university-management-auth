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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewStudent = void 0;
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
var env_config_1 = __importDefault(require("configs/env.config"));
var apiError_1 = __importDefault(require("errors/apiError"));
var http_status_1 = __importDefault(require("http-status"));
var semester_model_1 = __importDefault(require("models/semester.model"));
var student_model_1 = __importDefault(require("models/student.model"));
var user_model_1 = __importDefault(require("models/user.model"));
var mongoose_1 = require("mongoose");
var user_1 = require("types/user");
var user_2 = require("utils/user");
// eslint-disable-next-line import/prefer-default-export
var createNewStudent = function (student, user) { return __awaiter(void 0, void 0, void 0, function () {
    var semester, newUserAllData, session, id, newStudent, newUser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!user.password) {
                    user.password = env_config_1.default.default_student_pass;
                }
                // set role
                user.role = user_1.USER_ROLE.STUDENT;
                return [4 /*yield*/, semester_model_1.default.findById(student.semester)];
            case 1:
                semester = _a.sent();
                newUserAllData = null;
                return [4 /*yield*/, (0, mongoose_1.startSession)()];
            case 2:
                session = _a.sent();
                _a.label = 3;
            case 3:
                _a.trys.push([3, 9, , 12]);
                session.startTransaction();
                return [4 /*yield*/, (0, user_2.generateStudentId)(semester)];
            case 4:
                id = _a.sent();
                user.id = id;
                student.id = id;
                return [4 /*yield*/, student_model_1.default.create([student], { session: session })];
            case 5:
                newStudent = _a.sent();
                if (!newStudent.length) {
                    throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create student');
                }
                user.student = newStudent[0]._id;
                return [4 /*yield*/, user_model_1.default.create([user], { session: session })];
            case 6:
                newUser = _a.sent();
                if (!newUser.length) {
                    throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
                }
                newUserAllData = newUser[0];
                return [4 /*yield*/, session.commitTransaction()];
            case 7:
                _a.sent();
                return [4 /*yield*/, session.endSession()];
            case 8:
                _a.sent();
                return [3 /*break*/, 12];
            case 9:
                error_1 = _a.sent();
                return [4 /*yield*/, session.abortTransaction()];
            case 10:
                _a.sent();
                return [4 /*yield*/, session.endSession()];
            case 11:
                _a.sent();
                throw error_1;
            case 12:
                if (!newUserAllData) return [3 /*break*/, 14];
                return [4 /*yield*/, user_model_1.default.findOne({ id: newUserAllData.id }).populate({
                        path: 'student',
                        populate: [
                            {
                                path: 'semester',
                            },
                            {
                                path: 'department',
                            },
                            {
                                path: 'academicFaculty',
                            },
                        ],
                    })];
            case 13:
                newUserAllData = _a.sent();
                _a.label = 14;
            case 14: return [2 /*return*/, newUserAllData];
        }
    });
}); };
exports.createNewStudent = createNewStudent;
