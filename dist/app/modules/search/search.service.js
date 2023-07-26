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
exports.searchService = void 0;
const config_1 = __importDefault(require("../../../config/config"));
const search_model_1 = __importDefault(require("./search.model"));
const search_utlis_1 = require("./search.utlis");
const createNewSearchService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // generate id
    const id = yield (0, search_utlis_1.generateStudentId)();
    const idParts = id.split(' ');
    const lastPart = idParts[idParts.length - 1];
    payload.user_id = lastPart;
    if (!payload.role) {
        payload.role = config_1.default.user_default_role;
    }
    if (!payload.status) {
        payload.status = 'success';
    }
    payload.payload &&
        payload.payload.forEach(data => {
            const currentValue = data.input_values;
            const newArray = currentValue.sort((a, b) => b - a);
            payload.payload.find(firstValue => {
                firstValue.input_values = newArray;
            });
        });
    // True or False return
    payload.payload.find(firstData => {
        if (firstData.input_values.includes(payload.search_value)) {
            payload.result = 'True';
        }
        else {
            payload.result = 'False';
        }
    });
    const result = yield search_model_1.default.create(payload);
    return result;
});
const getSearchService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield search_model_1.default.find({});
    return result;
});
exports.searchService = {
    createNewSearchService,
    getSearchService,
};
