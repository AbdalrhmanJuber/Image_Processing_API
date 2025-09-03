import { Request, Response, NextFunction } from 'express';
import { ImageProcessor } from '../services/imageProcessor';
import { validateImageQuery } from '../utils/validation';

export const resizeImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { filename, width, height } = req.query as {
      filename: string;
      width: string;
      height: string;
    };

    const errors = validateImageQuery(filename, width, height);
    if (errors.length > 0) {
      res.status(400).json({ error: errors.join(', ') });
      return;
    }

    const widthNum = parseInt(width);
    const heightNum = parseInt(height);

    const processedImage = await ImageProcessor.processImage(
      filename,
      widthNum,
      heightNum
    );

    res.sendFile(processedImage.path, { root: '.' });
  } catch (error) {
    next(error);
  }
};
