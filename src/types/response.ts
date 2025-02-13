export class ResponseModel<T> {
    constructor(success: boolean, message: string, data: T) {
        this.success = success
        this.message = message
        this.data = data
    }

    private message: string;
    private success: boolean;
    private data: T;
}

export const getResponse = <T>(success: boolean, message: string, data?: T ) => {
    return new ResponseModel(success, message, data)
}