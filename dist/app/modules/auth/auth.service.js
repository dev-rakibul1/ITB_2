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
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config/config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const user_model_1 = __importDefault(require("../user/user.model"));
const loginUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = new user_model_1.default();
    const isUserExist = yield user.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist!');
    }
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password) &&
        !user.isPasswordMatch(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid password');
    }
    // ACCESS REFRESH TOKEN AND ASSESS TOKEN
    // access token
    const accessToken = jwtHelper_1.jwtTokenProvider.createToken({
        email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
        password: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password,
    }, config_1.default.jwtAccessKey, config_1.default.jwtAccessExpireDate);
    // refresh token
    const refreshToken = jwtHelper_1.jwtTokenProvider.createToken({
        email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
        password: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password,
    }, config_1.default.jwtRefreshKey, config_1.default.jwtRefreshExpireDate);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshTokenService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // verify token
    let verifyToken = null;
    try {
        verifyToken = jwtHelper_1.jwtTokenProvider.verifyJwtToken(token, config_1.default.jwtRefreshKey);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid refresh token.');
    }
    const { email } = verifyToken;
    const user = new user_model_1.default();
    const isUserExist = yield user.isUserExist(email);
    if (!(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    // generate a new token
    const newAccessToken = jwtHelper_1.jwtTokenProvider.createToken({
        email: isUserExist.email,
        role: isUserExist.role,
    }, config_1.default.jwtAccessKey, config_1.default.jwtAccessExpireDate);
    return {
        accessToken: newAccessToken,
    };
});
exports.authService = {
    loginUserService,
    refreshTokenService,
};
