import { Injectable, UseFilters } from "@nestjs/common";
import { AdminCreateEmployeeDto } from "src/appDto/admin.dto";
import { RegistrationDto } from "src/appDto/auth.dto";
import { CreateUserDto, UpdatePersonalInfoDto } from "src/appDto/user.dto";
import { UserActivityTypeEnum, UserTypeEnum } from "src/constants/enum";
import { User } from "src/models/user.model";
import { SqlExceptionFilter } from "src/utils/database";

@Injectable()
@UseFilters(SqlExceptionFilter)
export class UserRepository {
    private get model() {
        return User.query()
    }

    public async create(data: RegistrationDto, password: string): Promise<User> {
        return this.model.insert({
            type: UserTypeEnum.user,
            activity: UserActivityTypeEnum.buyer_seller,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
            email_verified_at: new Date(),
            registration_date: new Date(),
            password
        })
    }

    public async createEmployee(data: AdminCreateEmployeeDto, password: string) {
        return this.model.insert({
            type: UserTypeEnum.employee,
            activity: UserActivityTypeEnum.hh_employee,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            email_verified_at: new Date(),
            registration_date: new Date(),
            phone: data.phone,
            password
        })
    }

    public async mergeWithGuest(guestId: number, data: RegistrationDto, password: string): Promise<number> {
        return this.model.where({ id: guestId }).update({
            type: UserTypeEnum.user,
            activity: UserActivityTypeEnum.buyer_seller,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
            email_verified_at: new Date(),
            registration_date: new Date(),
            password
        })
    }

    public async createGuestUser(): Promise<User> {
        return this.model.insert({ type: UserTypeEnum.guest, activity: UserActivityTypeEnum.buyer_seller })
    }

    public async getById(id: number): Promise<User> {
        return this.model.findById(id)
    }

    public async getOne(filter: any): Promise<User> {
        return this.model.findOne(filter)
    }

    public async updateUserActivity(id: number, activity: UserActivityTypeEnum) {
        return this.model.where({ id }).update({ activity });
    }

    public async getPlatformUser(filter: any): Promise<User> {
        return this.model
        .where(filter)
        .where('type', UserTypeEnum.user)
        .whereNotIn('activity', [
            UserActivityTypeEnum.hh_admin,
            UserActivityTypeEnum.hh_employee,
            UserActivityTypeEnum.banned_employee,
        ]).first();
    }

    public async getEmployee(filter: any): Promise<User> {
        return this.model
            .where(filter)
            .whereIn('type', [
                UserTypeEnum.admin,
                UserTypeEnum.employee
            ])
            .whereIn('activity', [
                UserActivityTypeEnum.banned_employee,
                UserActivityTypeEnum.hh_admin,
                UserActivityTypeEnum.hh_employee
            ])
            .first()
    }

    public async updateEmployee(id: number, data: object) {
        return this.model
            .where({ id })
            .update(data);
    }

    public async changePassword(id: number, password: string): Promise<number> {
        return this.model.where({ id }).update({ password, last_password_changed: new Date() })
    }

    public async update(id: number, data: UpdatePersonalInfoDto) {
        return this.model.where({ id }).update(data)
    }

    public async block(id: number, reason?: string) {
        return this.model.where({ id }).update({
            activity: UserActivityTypeEnum.banned_client,
            deleted_by_reason: reason
        })
    }

    public async updateAdminPersonalInfo(id: number, data: object) {
        return this.model.where({ id }).update(data);
    }

    public async delete(id: number) {
        return this.model.deleteById(id)
    }

    public async getEmployeeListByPagination(filter: any, page: number, limit: number) {
        const offset = (page - 1) * limit;
        const [countResult, data] = await Promise.all([
            this.model
                .clone()
                .count('*')
                .modify(queryBuilder => {
                    queryBuilder.whereIn('type', [UserTypeEnum.employee])
                    if (filter && filter.search) {
                        queryBuilder
                            .where('email', 'like', `%${filter.search}%`)
                            .orWhere('first_name', 'like', `%${filter.search}%`)
                            .orWhere('last_name', 'like', `%${filter.search}%`)
                            .orWhere('phone', 'like', `%${filter.search}%`)
                    }
                }),
            this.model
                .modify(queryBuilder => {
                    queryBuilder.whereIn('type', [UserTypeEnum.employee])
                    if (filter && filter.search) {
                        queryBuilder
                            .where('email', 'like', `%${filter.search}%`)
                            .orWhere('first_name', 'like', `%${filter.search}%`)
                            .orWhere('last_name', 'like', `%${filter.search}%`)
                            .orWhere('phone', 'like', `%${filter.search}%`)
                    }
                })
                .select(["id", "first_name", "last_name", "email", "phone", "activity", "created_at"])
                .orderBy('users.created_at', 'desc')
                .offset(offset)
                .limit(limit),
          ]);
          const totalCount = +countResult[0]['count'];
          return {
            totalCount,
            data,
          };
    }

    public async getListByPagination(filter: any, page: number, limit: number, sort: any) {
        const offset = (page - 1) * limit;
    
        const [countResult, data] = await Promise.all([
            this.model
                .clone()
                .count('*')
                .modify(queryBuilder => {
                    queryBuilder.whereNotIn('type', [UserTypeEnum.admin, UserTypeEnum.employee, UserTypeEnum.guest]);
                    if (filter && filter.search) {
                        queryBuilder
                            .where('email', 'ILIKE', `%${filter.search}%`)
                            .orWhere('first_name', 'ILIKE', `%${filter.search}%`)
                            .orWhere('last_name', 'ILIKE', `%${filter.search}%`);
                    }
                }),
            this.model
                .clone()
                .select([
                    'users.id',
                    'users.first_name',
                    'users.last_name',
                    'users.email',
                    'users.phone',
                    'users.activity',
                    'users.deleted_by_reason',
                    'users.created_at',
                    User.raw(`(
                        SELECT row_to_json(pf)
                        FROM proof_of_founds pf
                        WHERE pf.user = users.id
                        ORDER BY pf.created_at ASC
                        LIMIT 1
                    ) as proof_of_founds`),
                    User.raw(`(
                        SELECT row_to_json(bl)
                        FROM balances bl
                        WHERE bl.user = users.id
                        ORDER BY bl.created_at ASC
                        LIMIT 1
                    ) as balances`)
                ])
                .whereNotIn('users.type', [UserTypeEnum.admin, UserTypeEnum.employee, UserTypeEnum.guest])
                .modify(queryBuilder => {
                    if (filter && filter.search) {
                        queryBuilder
                            .where('email', 'ILIKE', `%${filter.search}%`)
                            .orWhere('first_name', 'ILIKE', `%${filter.search}%`)
                            .orWhere('last_name', 'ILIKE', `%${filter.search}%`);
                    }
                })
                .orderBy(`users.${sort.sortKey}`, sort.sortValue)
                .offset(offset)
                .limit(limit),
        ]);
    
        const totalCount = countResult[0]['count'];
        return {
            totalCount,
            data,
        };
    }
    
}
