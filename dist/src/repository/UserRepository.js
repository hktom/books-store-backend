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
const User_1 = require("../entity/User");
class UserRepository {
    constructor(dataSource, user) {
        this.repository = dataSource.getRepository(user);
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find();
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.find({
                relations: ["orders"],
                where: { email: email },
            });
            if (user.length) {
                return user[0];
            }
            return null;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.find({
                relations: ["orders"],
                where: { id: id },
            });
            if (user.length) {
                return user[0];
            }
            return null;
        });
    }
    createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.User();
            user.firstName = payload.firstName;
            user.lastName = payload.lastName;
            user.email = payload.email;
            user.password = payload.password;
            return yield this.repository.save(user);
        });
    }
    updateProfile(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(payload.id, payload);
            return "User updated successfully";
        });
    }
}
exports.default = UserRepository;
