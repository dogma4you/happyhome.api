import { ValidationOptions, ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class IsDifferentConstraint implements ValidatorConstraintInterface {
    validate(propertyValue: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsDifferent(property: string, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
