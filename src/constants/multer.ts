import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs'
import { IRequest } from 'src/types/request';

export const multerOptions = {
    limits: { fileSize: 2147483648}, // limit set max size 2GB
    storage: diskStorage({
        destination: path.join(__dirname, '../../storage'),
        filename: (req: IRequest, file, cb) => {
            const filename: string = new Date().getTime().toString();
            const extension: string = path.parse(file.originalname).ext;
            if (!fs.existsSync(path.join(__dirname, `../../storage/user_${req.user ? req.user.id : req.admin.id}`))) {
                fs.mkdirSync(path.join(__dirname, `../../storage/user_${req.user ? req.user.id : req.admin.id}`))
            }
            req.fileName = `${filename}${extension}`
            cb(null, `user_${req.user ? req.user.id : req.admin.id}/${filename}${extension}`);
        }
    })
};
