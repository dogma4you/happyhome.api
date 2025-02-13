"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationExeptionFactory = void 0;
const common_1 = require("@nestjs/common");
const validationExeptionFactory = (errorList) => {
    const messages = errorList.map(error => `${error.property} has wrong value ${error.value}, ${error.constants ? Object.values(error.constraints).join(', ') : ''}`);
    return new common_1.BadRequestException(messages[0]);
};
exports.validationExeptionFactory = validationExeptionFactory;
//# sourceMappingURL=exeption.factory.js.map