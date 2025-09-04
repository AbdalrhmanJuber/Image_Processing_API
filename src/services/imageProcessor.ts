import sharp from 'sharp';
import path from 'path';
import { promises as fs } from 'fs';
import { FULL_IMAGES_PATH, THUMB_IMAGES_PATH } from '../config/constants';
import { ProcessedImage } from '../types';

export class ImageProcessor {
  static async processImage(
    filename: string,
    width: number,
    height: number
  ): Promise<ProcessedImage> {
    const inputPath = path.join(FULL_IMAGES_PATH, filename);
    const outputFilename = `${path.parse(filename).name}_${width}x${height}${path.parse(filename).ext}`;
    const outputPath = path.join(THUMB_IMAGES_PATH, outputFilename);

    try {
      await fs.access(outputPath);
      return {
        filename: outputFilename,
        width,
        height,
        path: outputPath,
      };
    } catch (error: unknown) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
      }
    }

    try {
      await fs.access(inputPath);
    } catch {
      throw new Error(`Source image ${filename} not found`);
    }

    await fs.mkdir(THUMB_IMAGES_PATH, { recursive: true });

    await sharp(inputPath)
      .resize(width, height)
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    return {
      filename: outputFilename,
      width,
      height,
      path: outputPath,
    };
  }
}
