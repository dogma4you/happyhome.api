"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptions = void 0;
const multer_1 = require("multer");
const path = require("path");
const fs = require("fs");
exports.multerOptions = {
    limits: { fileSize: 2147483648 },
    storage: (0, multer_1.diskStorage)({
        destination: path.join(__dirname, '../../storage'),
        filename: (req, file, cb) => {
            const filename = new Date().getTime().toString();
            const extension = path.parse(file.originalname).ext;
            if (!fs.existsSync(path.join(__dirname, `../../storage/user_${req.user ? req.user.id : req.admin.id}`))) {
                fs.mkdirSync(path.join(__dirname, `../../storage/user_${req.user ? req.user.id : req.admin.id}`));
            }
            req.fileName = `${filename}${extension}`;
            cb(null, `user_${req.user ? req.user.id : req.admin.id}/${filename}${extension}`);
        }
    })
};
//# sourceMappingURL=multer.js.map