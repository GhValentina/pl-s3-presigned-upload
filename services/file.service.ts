import * as _ from 'lodash';
import * as mime from 'mime-types';

export class FileService {
    public isImage(mimeType: string): boolean {
        const imageMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/heic',
            'image/tiff',
            'image/vnd.wap.wbmp',
            'image/x-icon',
            'image/x-jng',
            'image/x-ms-bmp',
            'image/svg+xml',
            'image/webp',
            'image/gif',
        ];

        return _.includes(imageMimeTypes, mimeType);
    }

    public isMedia(mimeType: string): boolean {
        return (
            this.isImage(mimeType) ||
            this.isVideo(mimeType) ||
            this.isAudio(mimeType)
        );
    }

    public isVideo(mimeType: string): boolean {
        const videoMimeTypes = [
            'video/mp4',
            'video/x-msvideo',
            'video/msvideo',
            'video/avi',
            'application/x-troff-msvideo',
            'video/x-ms-wmv',
            'video/x-ms-asf',
            'video/x-mng',
            'video/x-flv',
            'video/quicktime',
            'video/mpeg',
            'video/3gpp',
        ];

        return _.includes(videoMimeTypes, mimeType);
    }

    public isAudio(mimeType: string): boolean {
        return mimeType === 'audio/mpeg';
    }

    public isExcel(mimeType: string): boolean {
        if (mimeType === 'application/octet-stream') {
            return true;
        }

        const extensionName = mime.extension(mimeType);
        const excelExtension = ['xlsx', 'xls'];
        return _.includes(excelExtension, extensionName);
    }

    public isDocument(mimeType: string): boolean {
        const extensionName = mime.extension(mimeType);
        const excelExtension = [
            'doc',
            'docx',
            'txt',
            'pdf',
            'xml',
            'ppt',
            'pptx',
        ];
        return _.includes(excelExtension, extensionName);
    }

    public isArchive(mimeType: string): boolean {
        const extensionName = mime.extension(mimeType);
        const excelExtension = ['7z', 'rar', 'zip'];
        return _.includes(excelExtension, extensionName);
    }
}
