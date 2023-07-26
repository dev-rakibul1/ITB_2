"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRoutes = void 0;
const express_1 = __importDefault(require("express"));
const search_controller_1 = require("./search.controller");
const router = express_1.default.Router();
router.post('/create-search', search_controller_1.searchController.createSearch);
router.get('/', search_controller_1.searchController.getSearch);
exports.searchRoutes = router;
