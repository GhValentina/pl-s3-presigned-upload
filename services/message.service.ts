import { FileNotValidTypeException } from "../exceptions/file-not-valid.exception";
import { FileService } from "./file.service";
import * as mime from "mime-types";
import { GeneratorService } from "./generator.service";
import * as path from "path";
import { PresignedPostOptions } from "@aws-sdk/s3-presigned-post/src/createPresignedPost";
const fileService = new FileService();
const generatorService = new GeneratorService();

export class MessageService {
    constructor() {
    }

    uploadMessageFile(options: { originalName: string, fileType: string, myBucket }): PresignedPostOptions {
        const { originalName, fileType, myBucket } = options;

        if (
            !fileService.isExcel(fileType) &&
            !fileService.isDocument(fileType) &&
            !fileService.isMedia(fileType) &&
            !fileService.isArchive(fileType)
        ) {
            throw new FileNotValidTypeException();
        }

        const fileName = generatorService.fileName(<string>mime.extension(fileType));
        const key = path.join('tmp', fileName);

        return {
            Bucket: myBucket,
            Key: key,
            Fields: {
                "Content-Type": fileType,
                'X-amz-meta-name': originalName,
                'acl': 'public-read',
            },
            Expires: 300,
            Conditions: [
                ["content-length-range", 1000, 300 * 1000000],
                ["starts-with", "$Content-Type", fileType],
                ["eq", "$X-amz-meta-name", originalName],
            ]
        };
    }
}
