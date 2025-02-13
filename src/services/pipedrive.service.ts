import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PipedriveActions } from 'src/models/pipedrive.actions.model';

@Injectable()
export class PipedriveService {
  private axiosInstance: AxiosInstance;

  constructor() {
    const apiToken = process.env.PIPEDRIVE_API_TOKEN;
    this.axiosInstance = axios.create({
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
    } catch (error) {
      throw new Error(`Failed to fetch deals: ${error.message}`);
    }
  }

  async getStages() {
    try {
      const response = await this.axiosInstance.get('stages');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch stages');
    }
  }

  async getDealFields() {
    try {
      const response = await this.axiosInstance.get(`https://api.pipedrive.com/v1/dealFields`);
      const fields = response.data.data;
  
      console.log('Deal Fields:', fields.filter(x => x.id === 57)[0].options);
      return fields.map((field) => field.name).filter((name) => !!name);;
    } catch (error) {
      console.error('Error fetching deal fields:', error.message);
    }
  };

  async createDeal(data: object) {
    try {
      const response = await this.axiosInstance.post('/deals',data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create deal: ${error.message}`);
    }
  }

  async updateDeal(dealId: number, updates: object) {
    try {
      const response = await this.axiosInstance.put(`/deals/${dealId}`, updates);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update deal: ${error.message}`);
    }
  }

  async deleteDeal(dealId: number) {
    try {
      const response = await this.axiosInstance.delete(`/deals/${dealId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete deal: ${error.message}`);
    }
  }

  async createPerson(data: object) {
    try {
      const response = await this.axiosInstance.post('/persons', data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete deal: ${error.message}`);
    }
  }

  async updatePerson(id: number, data: object) {
    try {
      const response = await this.axiosInstance.put(`/persons/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update person: ${error.message}`);
    }
  }
}
