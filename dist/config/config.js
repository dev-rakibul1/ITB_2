"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 1000,
    database_urls: process.env.DATABASE_URL,
    database_local_url: process.env.DATABASE_LOCAL_URL,
    user_default_role: process.env.DEFAULT_ROLE,
    bcrypt_salts_round: process.env.BCRYPT_SALT_ROUNDS,
    jwtAccessKey: process.env.JWT_ACCESS_SECRET,
    jwtAccessExpireDate: process.env.JWT_ACCESS_SECRET_EXPIRE_IN,
    jwtRefreshKey: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpireDate: process.env.JWT_REFRESH_SECRET_EXPIRE_IN,
};
