"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipedriveService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let PipedriveService = class PipedriveService {
    constructor() {
        const apiToken = process.env.PIPEDRIVE_API_TOKEN;
        this.axiosInstance = axios_1.default.create({
            baseURL: 'https://api.pipedrive.com/v1',
            params: {
                api_token: apiToken,
            },
        });
    }
    async getDeals() {
        try {
            const response = await this.axiosInstance.get('/deals');
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to fetch deals: ${error.message}`);
        }
    }
    async getStages() {
        try {
            const response = await this.axiosInstance.get('stages');
            return response.data;
        }
        catch (error) {
            throw new Error('Failed to fetch stages');
        }
    }
    async getDealFields() {
        try {
            const response = await this.axiosInstance.get(`https://api.pipedrive.com/v1/dealFields`);
            const fields = response.data.data;
            console.log('Deal Fields:', fields.filter(x => x.id === 57)[0].options);
            return fields.map((field) => field.name).filter((name) => !!name);
            ;
        }
        catch (error) {
            console.error('Error fetching deal fields:', error.message);
        }
    }
    ;
    async createDeal(data) {
        try {
            const response = await this.axiosInstance.post('/deals', data);
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to create deal: ${error.message}`);
        }
    }
    async updateDeal(dealId, updates) {
        try {
            const response = await this.axiosInstance.put(`/deals/${dealId}`, updates);
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to update deal: ${error.message}`);
        }
    }
    async deleteDeal(dealId) {
        try {
            const response = await this.axiosInstance.delete(`/deals/${dealId}`);
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to delete deal: ${error.message}`);
        }
    }
    async createPerson(data) {
        try {
            const response = await this.axiosInstance.post('/persons', data);
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to delete deal: ${error.message}`);
        }
    }
    async updatePerson(id, data) {
        try {
            const response = await this.axiosInstance.put(`/persons/${id}`, data);
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to update person: ${error.message}`);
        }
    }
};
exports.PipedriveService = PipedriveService;
exports.PipedriveService = PipedriveService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PipedriveService);
//# sourceMappingURL=pipedrive.service.js.map