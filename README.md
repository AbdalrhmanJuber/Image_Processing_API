# Image Processing API

A Node.js/Express API for resizing images using Sharp.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000` by default.

## API Endpoints

### Health Check
Check if the API is running.

**Request:**
```bash
curl -X GET http://localhost:3000/
```

**Response (200 OK):**
```json
{
  "message": "Image Processing API is running"
}
```

### Resize Image
Resize an image to specified dimensions. The API will cache processed images for faster subsequent requests.

**Endpoint:** `GET /api/images/resize`

**Query Parameters:**
- `filename` (required): Name of the image file (must exist in `images/full/` directory)
- `width` (required): Target width in pixels (positive integer)
- `height` (required): Target height in pixels (positive integer)

#### Valid Request Examples

**Example 1: Resize fjord.jpg to 200x200**
```bash
curl -X GET "http://localhost:3000/api/images/resize?filename=fjord.jpg&width=200&height=200"
```

**Example 2: Resize palmtunnel.jpg to 500x300**
```bash
curl -X GET "http://localhost:3000/api/images/resize?filename=palmtunnel.jpg&width=500&height=300"
```

**Example 3: Using browser URL**
```
http://localhost:3000/api/images/resize?filename=encenadaport.jpg&width=150&height=150
```

**Successful Response:**
- **Status:** 200 OK
- **Content-Type:** image/jpeg
- **Body:** The resized image file

#### Error Responses

**Missing filename parameter:**
```bash
curl -X GET "http://localhost:3000/api/images/resize?width=200&height=200"
```

**Response (400 Bad Request):**
```json
{
  "error": "filename is required"
}
```

**Missing width parameter:**
```bash
curl -X GET "http://localhost:3000/api/images/resize?filename=fjord.jpg&height=200"
```

**Response (400 Bad Request):**
```json
{
  "error": "width is required"
}
```

**Missing height parameter:**
```bash
curl -X GET "http://localhost:3000/api/images/resize?filename=fjord.jpg&width=200"
```

**Response (400 Bad Request):**
```json
{
  "error": "height is required"
}
```

**Multiple missing parameters:**
```bash
curl -X GET "http://localhost:3000/api/images/resize?filename=fjord.jpg"
```

**Response (400 Bad Request):**
```json
{
  "error": "width is required, height is required"
}
```

**Invalid width (non-numeric):**
```bash
curl -X GET "http://localhost:3000/api/images/resize?filename=fjord.jpg&width=abc&height=200"
```

**Response (400 Bad Request):**
```json
{
  "error": "width must be a positive number"
}
```

**Invalid height (negative number):**
```bash
curl -X GET "http://localhost:3000/api/images/resize?filename=fjord.jpg&width=200&height=-100"
```

**Response (400 Bad Request):**
```json
{
  "error": "height must be a positive number"
}
```

**Invalid dimensions (zero values):**
```bash
curl -X GET "http://localhost:3000/api/images/resize?filename=fjord.jpg&width=0&height=200"
```

**Response (400 Bad Request):**
```json
{
  "error": "width must be a positive number"
}
```

**Non-existent image file:**
```bash
curl -X GET "http://localhost:3000/api/images/resize?filename=nonexistent.jpg&width=200&height=200"
```

**Response (404 Not Found):**
```json
{
  "error": "Source image nonexistent.jpg not found"
}
```

**Multiple validation errors:**
```bash
curl -X GET "http://localhost:3000/api/images/resize?filename=&width=abc&height=-50"
```

**Response (400 Bad Request):**
```json
{
  "error": "filename is required, width must be a positive number, height must be a positive number"
}
```

## Available Images

The following sample images are included in the `images/full/` directory:
- `fjord.jpg`
- `encenadaport.jpg`
- `icelandwaterfall.jpg`
- `palmtunnel.jpg`
- `santamonica.jpg`

## How Image Caching Works

1. **First Request:** When you request an image resize for the first time, the API:
   - Processes the original image from `images/full/`
   - Resizes it to your specified dimensions
   - Saves the processed image to `images/thumb/` with filename format: `originalname_WIDTHxHEIGHT.jpg`
   - Returns the resized image

2. **Subsequent Requests:** For the same image with the same dimensions:
   - The API checks if the processed image already exists in `images/thumb/`
   - If it exists, returns the cached version immediately (faster response)
   - No reprocessing is needed

**Example:**
- First request for `fjord.jpg` at 200x200 creates `images/thumb/fjord_200x200.jpg`
- Subsequent requests for the same image and dimensions serve the cached file

## Testing the API

### Using curl with verbose output:
```bash
curl -v -X GET "http://localhost:3000/api/images/resize?filename=fjord.jpg&width=200&height=200"
```

### Save resized image to file:
```bash
curl -X GET "http://localhost:3000/api/images/resize?filename=fjord.jpg&width=200&height=200" --output resized_fjord.jpg
```

### Check response headers:
```bash
curl -I -X GET "http://localhost:3000/api/images/resize?filename=fjord.jpg&width=200&height=200"
```

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── controllers/     # Route handlers
├── services/        # Business logic (image processing)
├── routes/          # Express routes
├── middleware/      # Custom middleware (error handling)
├── utils/           # Utility functions (validation)
├── types/           # TypeScript type definitions
├── config/          # Configuration files
└── app.ts          # Express app setup

spec/               # Test files
├── unit/           # Unit tests
├── integration/    # Integration tests
└── support/        # Test configuration

images/
├── full/          # Original images
└── thumb/         # Processed/cached images

build/             # Compiled JavaScript (generated)
```

## Development

### Adding New Images
1. Place new images in the `images/full/` directory
2. Ensure they are in a supported format (JPEG, PNG, WebP, etc.)
3. Use the filename in your API requests

### Environment Variables
- `PORT`: Server port (default: 3000)

### Error Handling
The API includes comprehensive error handling for:
- Missing required parameters
- Invalid parameter values
- Non-existent image files
- File system errors
- Image processing errors

All errors return appropriate HTTP status codes and descriptive error messages in JSON format.
