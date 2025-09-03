import { ImageProcessor } from '../../src/services/imageProcessor';
import path from 'path';

describe('ImageProcessor', () => {
  it('should process an image successfully', async () => {
    const result = await ImageProcessor.processImage('fjord.jpg', 200, 200);
    
    expect(result).toBeDefined();
    expect(result.width).toBe(200);
    expect(result.height).toBe(200);
    expect(result.filename).toContain('200x200');
  });

  it('should throw error for non-existent image', async () => {
    try {
      await ImageProcessor.processImage('nonexistent.jpg', 200, 200);
      fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
