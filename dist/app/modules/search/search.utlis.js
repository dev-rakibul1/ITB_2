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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfNumberExists = exports.generateStudentId = void 0;
const search_model_1 = __importDefault(require("./search.model"));
// Find the last student id
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield search_model_1.default.findOne({ role: 'user' })
        .sort({ createdAt: -1 })
        .lean();
    const uniqueId = lastUser === null || lastUser === void 0 ? void 0 : lastUser.user_id;
    return uniqueId ? parseInt(uniqueId.replace('id: ', '')) : 0;
});
// Generate student id
const generateStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastId = yield findLastStudentId();
    const newId = lastId + 1;
    return `id: ${newId}`;
});
exports.generateStudentId = generateStudentId;
//
const checkIfNumberExists = (numberToFind, payload) => {
    const inputValuesArray = payload.map(item => item === null || item === void 0 ? void 0 : item.input_values.split(', ').map(Number));
    for (const valuesArray of inputValuesArray) {
        if (valuesArray.includes(numberToFind)) {
            return true;
        }
    }
    return false;
};
exports.checkIfNumberExists = checkIfNumberExists;
