"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatContracts = void 0;
function concatContracts(arr1, arr2) {
    const result = [];
    const uniqueIds = new Set();
    arr1.forEach(contract => {
        if (!uniqueIds.has(contract.id)) {
            result.push(contract);
            uniqueIds.add(contract.id);
        }
    });
    arr2.forEach(contract => {
        if (!uniqueIds.has(contract.id)) {
            result.push(contract);
            uniqueIds.add(contract.id);
        }
    });
    return result;
}
exports.concatContracts = concatContracts;
//# sourceMappingURL=array.js.map