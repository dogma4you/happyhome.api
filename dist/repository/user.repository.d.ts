import { AdminCreateEmployeeDto } from "src/appDto/admin.dto";
import { RegistrationDto } from "src/appDto/auth.dto";
import { UpdatePersonalInfoDto } from "src/appDto/user.dto";
import { UserActivityTypeEnum } from "src/constants/enum";
import { User } from "src/models/user.model";
export declare class UserRepository {
    private get model();
    create(data: RegistrationDto, password: string): Promise<User>;
    createEmployee(data: AdminCreateEmployeeDto, password: string): Promise<User>;
    mergeWithGuest(guestId: number, data: RegistrationDto, password: string): Promise<number>;
    createGuestUser(): Promise<User>;
    getById(id: number): Promise<User>;
    getOne(filter: any): Promise<User>;
    updateUserActivity(id: number, activity: UserActivityTypeEnum): Promise<number>;
    getPlatformUser(filter: any): Promise<User>;
    getEmployee(filter: any): Promise<User>;
    updateEmployee(id: number, data: object): Promise<number>;
    changePassword(id: number, password: string): Promise<number>;
    update(id: number, data: UpdatePersonalInfoDto): Promise<number>;
    block(id: number, reason?: string): Promise<number>;
    updateAdminPersonalInfo(id: number, data: object): Promise<number>;
    delete(id: number): Promise<number>;
    getEmployeeListByPagination(filter: any, page: number, limit: number): Promise<{
        totalCount: number;
        data: User[];
    }>;
    getListByPagination(filter: any, page: number, limit: number, sort: any): Promise<{
        totalCount: any;
        data: User[];
    }>;
}
