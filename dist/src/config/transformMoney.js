"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformerMoney = void 0;
class TransformerMoney {
    to(data) {
        return data;
    }
    from(data) {
        return data ? parseFloat(data.substring(1)) : 0.0;
    }
}
exports.TransformerMoney = TransformerMoney;
