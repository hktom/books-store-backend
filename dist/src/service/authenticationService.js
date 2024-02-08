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
class AuthenticationService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    me(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = this.jwtService.verifyToken(token);
            if (!userId) {
                return null;
            }
            return yield this.userRepository.getUserById(userId);
        });
    }
    updaterUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.updateProfile(user);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getUserByEmail(email);
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserByEmail(email);
            if (user && user.password === password) {
                return this.jwtService.generateToken(user.id);
            }
            return null;
        });
    }
    register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.getUserByEmail(payload.email);
            if (user) {
                return null;
            }
            user = yield this.userRepository.createUser(payload);
            if (!user) {
                return null;
            }
            return this.login(user.email, user.password);
        });
    }
    logout(token) {
        return __awaiter(this, void 0, void 0, function* () {
            // remove token from session
        });
    }
}
exports.default = AuthenticationService;
