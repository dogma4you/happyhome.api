import { CreateFileDto } from "src/appDto/file.dto";
import { Files } from "src/models/files";
export declare class FileRepository {
    private get model();
    create(data: CreateFileDto): Promise<Files>;
    getByNames(list: string[], user: number): Promise<Files[]>;
    getByName(name: string): Promise<Files>;
}
