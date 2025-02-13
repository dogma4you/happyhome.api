export class CreateDealDto {
  title: string;
  value: number;
  currency?: string;
}

export class UpdateDealDto {
  title?: string;
  value?: number;
  currency?: string;
}
