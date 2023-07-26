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
const colors_1 = __importDefault(require("colors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config/config"));
const index_1 = __importDefault(require("../index"));
process.on('uncaughtException', err => {
    console.log('Uncaught exception is detected.', err);
    process.exit(1);
});
let server;
const databaseConnected = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.default.database_urls);
        console.log(colors_1.default.black.bgGreen('Database connected is success!'));
        server = index_1.default.listen(config_1.default.port, () => {
            console.log(colors_1.default.black.bgYellow(`OUR DCHB LISTEN PORT IS: ${config_1.default.port}`));
        });
    }
    catch (error) {
        console.log(colors_1.default.black.bgCyan(error));
        console.log(colors_1.default.black.bgRed('Fail to DB connected!'));
    }
});
process.on('unhandledRejection', error => {
    if (server) {
        server.close(() => {
            console.log(error);
            process.exit(1);
        });
    }
    else {
        process.exit(2);
    }
});
process.on('SIGTERM', () => {
    console.log('SIGTERM is received!');
    if (server) {
        server.close();
    }
});
exports.default = databaseConnected;
