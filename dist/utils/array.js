"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAsArray = void 0;
function getAsArray(data) {
    if (Array.isArray(data))
        return data;
    else if (!data) {
        return [];
    }
    else {
        return [data];
    }
}
exports.getAsArray = getAsArray;
//# sourceMappingURL=array.js.map