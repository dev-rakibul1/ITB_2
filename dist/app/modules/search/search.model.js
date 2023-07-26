"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PayloadItemSchema = {
    timestamp: {
        type: Date,
        default: Date.now,
    },
    input_values: { type: [Number], required: true },
};
const searchSchema = new mongoose_1.Schema({
    status: {
        type: String,
    },
    user_id: {
        type: String,
    },
    payload: { type: [PayloadItemSchema], required: true },
    search_value: {
        type: Number,
    },
    result: {
        type: String,
    },
    role: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const Search = (0, mongoose_1.model)('search', searchSchema);
exports.default = Search;
