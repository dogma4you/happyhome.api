"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRepository = void 0;
const common_1 = require("@nestjs/common");
const address_model_1 = require("../models/address.model");
const generator_1 = require("../utils/generator");
let AddressRepository = class AddressRepository {
    get model() {
        return address_model_1.Address.query();
    }
    async create(data, user) {
        const location = (0, generator_1.generateLocatonRowByCordinates)(data.lat, data.lng);
        return this.model.insert({ ...data, location, user });
    }
    async getOne(filter) {
        return this.model.select('*').where(filter).first();
    }
    async update(id, data) {
        return this.model.where({ id }).update(data).returning('*');
    }
    async getByLocationRadius(filter, lat, lng, radius, page, limit) {
        const offset = (page - 1) * limit;
        return this.model
            .select('*')
            .where(filter)
            .whereRaw(`ST_DWithin(location::geography, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, ?)`, [lng, lat, radius])
            .limit(limit)
            .offset(offset);
    }
    async getByMapArea(northLat, northLng, southLat, southLng, eastLat, eastLng, westLat, westLng) {
        const polygonWKT = `
          POLYGON((
            ${westLng} ${northLat},
            ${eastLng} ${northLat},
            ${eastLng} ${southLat},
            ${westLng} ${southLat},
            ${westLng} ${northLat}
          ))
        `.trim();
        return this.model
            .select('*')
            .whereRaw(`ST_Within(
              addresses.location::geometry,
              ST_GeomFromText(?, 4326)
            )`, [polygonWKT]);
    }
};
exports.AddressRepository = AddressRepository;
exports.AddressRepository = AddressRepository = __decorate([
    (0, common_1.Injectable)()
], AddressRepository);
//# sourceMappingURL=address.repository.js.map