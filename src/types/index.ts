export interface ImageQuery {
  filename: string;
  width: number;
  height: number;
}

export interface ProcessedImage {
  filename: string;
  width: number;
  height: number;
  path: string;
}

export interface APIError extends Error {
  statusCode: number;
}
