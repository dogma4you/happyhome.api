import { Request } from "express";
import { User } from "src/models/user.model";

export interface IRequest extends Request {
    user?: User;
    admin?: User;
    guest?: User;
    fileName?: string;
}