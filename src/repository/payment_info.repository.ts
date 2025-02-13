import { Injectable, UseFilters } from "@nestjs/common";
import { AdminCreatePayemtnInfo } from "src/appDto/address.dto";
import { PaymentInfo } from "src/models/payment_info.model";
import { SqlExceptionFilter } from "src/utils/database";

@Injectable()
@UseFilters(SqlExceptionFilter)
export class PaymentInfoRepository {
  private get model() {
    return PaymentInfo.query()
  }

  public async create(data: AdminCreatePayemtnInfo) {
    return this.model.insert({ ...data, reference_number: 'null' }).returning('*');
  }

  public async update(id: number, data: AdminCreatePayemtnInfo) {
    return this.model.where({ id }).update(data);
  }

  public async delete(id: number) {
    return this.model.deleteById(id);
  }

  public async getAll() {
    return this.model.where({}).select('*')
  }
}