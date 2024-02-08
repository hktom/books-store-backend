"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class JwtService {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || "";
        this.jwtExpiration = process.env.JWT_EXPIRATION || "1d";
    }
    generateToken(id) {
        return jsonwebtoken_1.default.sign({ id }, this.jwtSecret, {
            expiresIn: this.jwtExpiration,
        });
    }
    verifyToken(token) {
        let result = null;
        jsonwebtoken_1.default.verify(token, this.jwtSecret, (err, user) => {
            if (err) {
                result = null;
            }
            else {
                result = user.id;
            }
        });
        return result;
    }
    removeToken(token) { }
}
exports.default = JwtService;
