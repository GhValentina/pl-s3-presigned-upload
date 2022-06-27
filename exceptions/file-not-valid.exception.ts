import { BadRequestException } from './bad-request-exception';

export class FileNotValidTypeException extends BadRequestException {
    constructor() {
        super({ message: 'error.file.not_valid_type', statusCode: 400 });
    }
}
