import multer from 'multer';
import uuid from 'uuid';

interface IMimeType {
    'image/png' : string,
    'image/jpeg': string,
    'image/jpg' : string
    [propName: string]: string | undefined;
}

const MIME_TYPE_MAP:IMimeType = {
    // Helper const to extract file extension
    'image/png' : 'png',
    'image/jpeg': 'jpeg',
    'image/jpg' : 'jpg'
};

const fileUpload = multer({
    limits: {
        fileSize: 500000           // 500 KB
    },
    storage: multer.diskStorage({
        destination: (req, file, callBack) => {
            callBack(null, 'uploads/images');
        },
        filename: (req, file, callBack) => {
            const fileExtension = MIME_TYPE_MAP[file.mimetype];
            if (fileExtension){
                callBack(null, uuid.v1() + '.' + fileExtension);        // Generate randome file name with the file extension
            }
        }
    }),
    fileFilter: (req, file, callBack) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];                 // Check that the file provided is a valid file extension
        if (!isValid){
            return callBack(new Error('Invalid mime type'));
        }
        callBack(null, isValid);

    }
});

export = fileUpload;