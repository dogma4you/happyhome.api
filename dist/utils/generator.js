"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLocatonRowByCordinates = exports.generateVerificationCode = void 0;
function generateVerificationCode() {
    const num = Math.floor(100000 + Math.random() * 900000);
    return num.toString();
}
exports.generateVerificationCode = generateVerificationCode;
function generateLocatonRowByCordinates(lat, lng) {
    return `SRID=4326;POINT(${lng} ${lat})`;
}
exports.generateLocatonRowByCordinates = generateLocatonRowByCordinates;
//# sourceMappingURL=generator.js.map