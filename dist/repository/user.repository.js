"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const enum_1 = require("../constants/enum");
const user_model_1 = require("../models/user.model");
const database_1 = require("../utils/database");
let UserRepository = class UserRepository {
    get model() {
        return user_model_1.User.query();
    }
    async create(data, password) {
        return this.model.insert({
            type: enum_1.UserTypeEnum.user,
            activity: enum_1.UserActivityTypeEnum.buyer_seller,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
            email_verified_at: new Date(),
            registration_date: new Date(),
            password
        });
    }
    async createEmployee(data, password) {
        return this.model.insert({
            type: enum_1.UserTypeEnum.employee,
            activity: enum_1.UserActivityTypeEnum.hh_employee,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            email_verified_at: new Date(),
            registration_date: new Date(),
            phone: data.phone,
            password
        });
    }
    async mergeWithGuest(guestId, data, password) {
        return this.model.where({ id: guestId }).update({
            type: enum_1.UserTypeEnum.user,
            activity: enum_1.UserActivityTypeEnum.buyer_seller,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
            email_verified_at: new Date(),
            registration_date: new Date(),
            password
        });
    }
    async createGuestUser() {
        return this.model.insert({ type: enum_1.UserTypeEnum.guest, activity: enum_1.UserActivityTypeEnum.buyer_seller });
    }
    async getById(id) {
        return this.model.findById(id);
    }
    async getOne(filter) {
        return this.model.findOne(filter);
    }
    async updateUserActivity(id, activity) {
        return this.model.where({ id }).update({ activity });
    }
    async getPlatformUser(filter) {
        return this.model
            .where(filter)
            .where('type', enum_1.UserTypeEnum.user)
            .whereNotIn('activity', [
            enum_1.UserActivityTypeEnum.hh_admin,
            enum_1.UserActivityTypeEnum.hh_employee,
            enum_1.UserActivityTypeEnum.banned_employee,
        ]).first();
    }
    async getEmployee(filter) {
        return this.model
            .where(filter)
            .whereIn('type', [
            enum_1.UserTypeEnum.admin,
            enum_1.UserTypeEnum.employee
        ])
            .whereIn('activity', [
            enum_1.UserActivityTypeEnum.banned_employee,
            enum_1.UserActivityTypeEnum.hh_admin,
            enum_1.UserActivityTypeEnum.hh_employee
        ])
            .first();
    }
    async updateEmployee(id, data) {
        return this.model
            .where({ id })
            .update(data);
    }
    async changePassword(id, password) {
        return this.model.where({ id }).update({ password, last_password_changed: new Date() });
    }
    async update(id, data) {
        return this.model.where({ id }).update(data);
    }
    async block(id, reason) {
        return this.model.where({ id }).update({
            activity: enum_1.UserActivityTypeEnum.banned_client,
            deleted_by_reason: reason
        });
    }
    async updateAdminPersonalInfo(id, data) {
        return this.model.where({ id }).update(data);
    }
    async delete(id) {
        return this.model.deleteById(id);
    }
    async getEmployeeListByPagination(filter, page, limit) {
        const offset = (page - 1) * limit;
        const [countResult, data] = await Promise.all([
            this.model
                .clone()
                .count('*')
                .modify(queryBuilder => {
                queryBuilder.whereIn('type', [enum_1.UserTypeEnum.employee]);
                if (filter && filter.search) {
                    queryBuilder
                        .where('email', 'like', `%${filter.search}%`)
                        .orWhere('first_name', 'like', `%${filter.search}%`)
                        .orWhere('last_name', 'like', `%${filter.search}%`)
                        .orWhere('phone', 'like', `%${filter.search}%`);
                }
            }),
            this.model
                .modify(queryBuilder => {
                queryBuilder.whereIn('type', [enum_1.UserTypeEnum.employee]);
                if (filter && filter.search) {
                    queryBuilder
                        .where('email', 'like', `%${filter.search}%`)
                        .orWhere('first_name', 'like', `%${filter.search}%`)
                        .orWhere('last_name', 'like', `%${filter.search}%`)
                        .orWhere('phone', 'like', `%${filter.search}%`);
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
    async getListByPagination(filter, page, limit, sort) {
        const offset = (page - 1) * limit;
        const [countResult, data] = await Promise.all([
            this.model
                .clone()
                .count('*')
                .modify(queryBuilder => {
                queryBuilder.whereNotIn('type', [enum_1.UserTypeEnum.admin, enum_1.UserTypeEnum.employee, enum_1.UserTypeEnum.guest]);
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
                user_model_1.User.raw(`(
                        SELECT row_to_json(pf)
                        FROM proof_of_founds pf
                        WHERE pf.user = users.id
                        ORDER BY pf.created_at ASC
                        LIMIT 1
                    ) as proof_of_founds`),
                user_model_1.User.raw(`(
                        SELECT row_to_json(bl)
                        FROM balances bl
                        WHERE bl.user = users.id
                        ORDER BY bl.created_at ASC
                        LIMIT 1
                    ) as balances`)
            ])
                .whereNotIn('users.type', [enum_1.UserTypeEnum.admin, enum_1.UserTypeEnum.employee, enum_1.UserTypeEnum.guest])
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
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.UseFilters)(database_1.SqlExceptionFilter)
], UserRepository);
//# sourceMappingURL=user.repository.js.map