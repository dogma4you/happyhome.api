import { Injectable, UseFilters } from "@nestjs/common";
import { SavedLists } from "src/models/saved_lists.model";
import { SqlExceptionFilter } from "src/utils/database";

@Injectable()
@UseFilters(SqlExceptionFilter)
export class SavedListsRepository {

    private get model() {
        return SavedLists.query()
    }

    public async create(user: number) {
      return this.model.insert({ user });
    }

    public async getById(id: number) {
      return this.model.where({ id }).first();
    }

    public async getByUserId(user: number) {
      let data = await this.model.where({ user }).first();
      if (!data) data = await this.create(user);
      return data;
    }

}
