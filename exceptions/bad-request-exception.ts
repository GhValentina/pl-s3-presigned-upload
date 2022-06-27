export class BadRequestException extends Error {
    public statusCode: number;
    public message: string;

    constructor(error: { statusCode: number, message: string }) {
        super();
        this.statusCode = error.statusCode;
        this.message = error.message;
    }
}
