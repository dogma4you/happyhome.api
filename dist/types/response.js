"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponse = exports.ResponseModel = void 0;
class ResponseModel {
    constructor(success, message, data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}
exports.ResponseModel = ResponseModel;
const getResponse = (success, message, data) => {
    return new ResponseModel(success, message, data);
};
exports.getResponse = getResponse;
//# sourceMappingURL=response.js.map