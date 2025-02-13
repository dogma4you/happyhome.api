export declare class ResponseModel<T> {
    constructor(success: boolean, message: string, data: T);
    private message;
    private success;
    private data;
}
export declare const getResponse: <T>(success: boolean, message: string, data?: T) => ResponseModel<T>;
