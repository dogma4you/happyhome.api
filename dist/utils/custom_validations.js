"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDifferent = exports.IsDifferentConstraint = void 0;
const class_validator_1 = require("class-validator");
let IsDifferentConstraint = class IsDifferentConstraint {
    validate(propertyValue, args) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = args.object[relatedPropertyName];
        return propertyValue !== relatedValue;
    }
    defaultMessage(args) {
        const [relatedPropertyName] = args.constraints;
        return `${args.property} should not be equal to ${relatedPropertyName}`;
    }
};
exports.IsDifferentConstraint = IsDifferentConstraint;
exports.IsDifferentConstraint = IsDifferentConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], IsDifferentConstraint);
function IsDifferent(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsDifferentConstraint,
        });
    };
}
exports.IsDifferent = IsDifferent;
//# sourceMappingURL=custom_validations.js.map