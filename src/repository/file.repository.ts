import { Injectable, UseFilters } from "@nestjs/common";
import { CreateFileDto } from "src/appDto/file.dto";
import { Files } from "src/models/files";
import { SqlExceptionFilter } from "src/utils/database";

@Injectable()
@UseFilters(SqlExceptionFilter)
export class FileRepository {

    private get model() {
        return Files.query()
    }

    public async create(data: CreateFileDto) {
        return this.model.insert(data).returning('*')
    }

    public async getByNames(list: string[], user: number) {
        return this.model.where({ user }).whereIn('name', list);
    }

    public async getByName(name: string) {
        return this.model.where({ name }).first();
    }
}
