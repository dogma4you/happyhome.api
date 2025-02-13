import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GoogleMapsService {
  private readonly apiKey = process.env.GOOGLE_MAP_API_KEY;
  private readonly baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

  constructor(private readonly httpService: HttpService) {}

  async getByRadius(lat: number, lng: number, radius: number): Promise<AxiosResponse<any>> {
    const url = `${this.baseUrl}?location=${lat},${lng}&radius=${radius}&key=${this.apiKey}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}