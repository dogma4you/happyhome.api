import * as path from "path";
import * as fs from 'fs';
import * as sharp from "sharp";

export async function getBluredImage(image: string, user: number) {
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