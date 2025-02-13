import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
export declare class GoogleMapsService {
    private readonly httpService;
    private readonly apiKey;
    private readonly baseUrl;
    constructor(httpService: HttpService);
    getByRadius(lat: number, lng: number, radius: number): Promise<AxiosResponse<any>>;
}
