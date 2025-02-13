import { Injectable } from "@nestjs/common";
import { PipedriveActions } from "src/models/pipedrive.actions.model";

@Injectable()
export class PipedriveActionsRepository {
  private get model() {
    return PipedriveActions.query()
  }

  public async create(data: object) {
    return this.model.insert(data);
  }

  public async getOne(filter: object) {
    return this.model.where(filter).first();
  }

  public async updateOne(id: number, data: object) {
    return this.model.where({ id }).update(data);
  }
}