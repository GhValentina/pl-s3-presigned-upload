import { v4 as uuid } from 'uuid';

export class GeneratorService {
    public uuid(): string {
        return uuid();
    }
    public fileName(ext: string): string {
        return this.uuid() + '.' + ext;
    }
}
