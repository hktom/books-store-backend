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
Object.defineProperty(exports, "__esModule", { value: true });
class AuthenticationController {
    constructor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(req.body.user);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ message: "Email and password are required" });
            }
            if (!/@/g.test(email)) {
                return res.status(400).json({ message: "Invalid email" });
            }
            const token = yield this.authenticationService.login(email, password);
            if (!token) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            res.json({ token });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, firstName, lastName } = req.body;
            if (!/@/g.test(email)) {
                return res.status(400).json({ message: "Invalid email" });
            }
            if (!email || !password || !firstName || !lastName) {
                return res.status(400).json({
                    message: "Email, password, first name and last name are required",
                });
            }
            const token = yield this.authenticationService.register({
                email,
                password,
                firstName,
                lastName,
            });
            if (!token) {
                return res.status(400).json({ message: "User already exists" });
            }
            res.json({ token });
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = AuthenticationController;
