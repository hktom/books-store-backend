"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authenticationController_1 = __importDefault(require("../controller/authenticationController"));
const bootstrap_1 = require("../config/bootstrap");
const authenticationController = new authenticationController_1.default(bootstrap_1.authenticationService);
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/login", (req, res) => authenticationController.login(req, res));
exports.authRouter.post("/register", (req, res) => authenticationController.register(req, res));
exports.authRouter.get("/me", (req, res, next) => bootstrap_1.middleware.check(req, res, next), (req, res) => authenticationController.me(req, res));
exports.default = exports.authRouter;
