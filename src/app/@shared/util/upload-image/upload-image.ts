import { SnackBarNotificationService } from "../../services/snack-bar-notification.service";

interface ImageObject {
    file: any;
    preview: string;
}

interface ErrorUploadImage {
    message: string;
}

export interface FilePros{
    "0": File, 
    "length": number
}

export class UploadImage {
    imageObject: ImageObject
    sizeDefault = 3 * 1024 * 1024;
    errorUploadImage: ErrorUploadImage = null;

    constructor() {}

    processFilesSelected(file: FilePros): ImageObject | void {        
        const reader = new FileReader();
        const isImageFile = this.isImageFile(file);
        const isSizeValid = this.verifyFileSize(file);

        if(!isImageFile){
            this.errorUploadImage = {message: 'O arquivo não é uma imagem'};
            return
        }

        if(!isSizeValid){
            this.errorUploadImage = {message: 'O arquivo não é uma imagem'};
            return
        }

        reader.onload = (e) => {
            this.imageObject = {file, preview: reader.result as string}
            reader.readAsDataURL(file[0]);
            console.log('IMAGE OBJECT CLASS: ', this.imageObject);
            
        }

        return this.imageObject;
    }

    isImageFile(file: FilePros): boolean {
        return file[0].type === 'image/jpeg' || file[0].type === 'image/png';
    }

    verifyFileSize(file: FilePros): boolean {
        return file[0].size <= this.sizeDefault;
    }

    hasErrorUploadImage(): boolean {
        return this.errorUploadImage !== null;
    }
}