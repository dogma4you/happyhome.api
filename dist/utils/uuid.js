"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTranssactionId = void 0;
const uuid_1 = require("uuid");
function generateTranssactionId() {
    return (0, uuid_1.v4)();
}
exports.generateTranssactionId = generateTranssactionId;
//# sourceMappingURL=uuid.js.map