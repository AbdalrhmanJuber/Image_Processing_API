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

## API Endpoints

### Resize Image
- **URL**: `/api/images/resize`
- **Method**: GET
- **Query Parameters**:
  - `filename`: Image filename (required)
  - `width`: Target width in pixels (required)
  - `height`: Target height in pixels (required)

**Example**: `http://localhost:3000/api/images/resize?filename=fjord.jpg&width=200&height=200`

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
├── services/        # Business logic
├── routes/          # Express routes
├── middleware/      # Custom middleware
├── utils/           # Utility functions
├── types/           # TypeScript type definitions
├── config/          # Configuration files
└── app.ts          # Express app setup

spec/               # Test files
images/
├── full/          # Original images
└── thumb/         # Processed images
```
