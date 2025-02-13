import { SavedLists } from "src/models/saved_lists.model";
export declare class SavedListsRepository {
    private get model();
    create(user: number): Promise<SavedLists>;
    getById(id: number): Promise<SavedLists>;
    getByUserId(user: number): Promise<SavedLists>;
}
