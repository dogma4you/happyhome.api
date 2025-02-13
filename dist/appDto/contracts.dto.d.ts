export declare class GetContractsDto {
    search: string;
    page: string;
    limit: string;
    propertyType: string;
    radiusLat: string;
    radiusLng: string;
    radiusVal: string;
    radius: number;
    paid: number;
    listedDurationFrom?: number;
    listedDurationTo?: number;
    zipCode?: string;
    totalSalesPriceFrom?: number;
    totalSalesPriceTo?: number;
    estAvrFrom?: number;
    estAvrTo?: number;
    estRentMoFrom?: number;
    estRentMoTo?: number;
    priceFrom?: number;
    priceTo?: number;
    estNetProfitFrom?: number;
    estNetProfitTo?: number;
    estRepairCostFrom?: number;
    estRepairCostTo?: number;
    buyersFeeFrom?: number;
    buyersFeeTo?: number;
    earnestMoneyDepFrom?: number;
    earnestMoneyDepTo?: number;
    totalAmountFrom?: number;
    totalAmountTo?: number;
    asignmentFeeFrom?: number;
    asignmentFeeTo?: number;
    northLat: number;
    northLng: number;
    southLat: number;
    southLng: number;
    eastLat: number;
    eastLng: number;
    westLat: number;
    westLng: number;
    withinMapArea: string;
}
export interface IDeleteContractParams {
    id: number;
}
export declare class UnlockContractDto {
    contract: number;
}
