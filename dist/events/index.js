"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const semester_event_1 = __importDefault(require("./semester.event"));
const subscribeToEvents = () => {
    (0, semester_event_1.default)();
};
exports.default = subscribeToEvents;
