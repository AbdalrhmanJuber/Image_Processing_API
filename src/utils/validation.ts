export const validateImageQuery = (
  filename: string,
  width: string,
  height: string
) => {
  const errors: string[] = [];

  if (!filename) {
    errors.push('filename is required');
  }

  if (!width) {
    errors.push('width is required');
  } else {
    const widthNum = parseInt(width);
    if (isNaN(widthNum) || widthNum <= 0 || width !== widthNum.toString()) {
      errors.push('width must be a positive number');
    }
  }

  if (!height) {
    errors.push('height is required');
  } else {
    const heightNum = parseInt(height);
    if (isNaN(heightNum) || heightNum <= 0 || height !== heightNum.toString()) {
      errors.push('height must be a positive number');
    }
  }

  return errors;
};
