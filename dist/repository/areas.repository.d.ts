import { Areas } from "src/models/areas.model";
export declare class AreasRepository {
    private get model();
    create(data: any): Promise<Areas>;
    update(id: number, data: object): Promise<number>;
    getOfferAreas(offer: number): Promise<Areas[]>;
    deleteAreas(ids: number[]): Promise<number>;
}
