"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBluredImage = void 0;
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
async function getBluredImage(image, user) {
    const storagePath = path.join(__dirname, '../../', 'storage');
    if (!fs.existsSync(path.join(storagePath, 'blured'))) {
        fs.mkdirSync(path.join(storagePath, 'blured'));
    }
    const originalPath = path.join(storagePath, `user_${user}`, image);
    const bluredImageUrl = path.join(storagePath, 'blured', `_blured_${image}`);
    if (!fs.existsSync(bluredImageUrl)) {
        await sharp(originalPath)
            .blur(30)
            .toFile(bluredImageUrl);
    }
    return `_blured_${image}`;
}
exports.getBluredImage = getBluredImage;
//# sourceMappingURL=images.js.map