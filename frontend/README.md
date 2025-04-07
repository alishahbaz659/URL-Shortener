# URL Shortener Frontend

This is the React frontend for the URL Shortener application. It provides a user interface for creating shortened URLs and viewing their details.

## Features

- Shorten long URLs with a simple form
- View information about shortened URLs
- Copy short URLs to clipboard with a single click
- Responsive design for all devices

## Development

### Prerequisites

- Node.js 14+ and npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm start
```

This will start the React development server at http://localhost:3000.

### Building for Production

```bash
# Build for production
npm run build
```

## Project Structure

- `src/components/` - React components
  - `UrlShortener.tsx` - Component for creating short URLs
  - `UrlLookup.tsx` - Component for looking up information about short URLs
- `src/apolloClient.ts` - Apollo Client configuration for GraphQL requests

## GraphQL API

The frontend communicates with the backend via GraphQL. The following operations are used:

- `shortenUrl` mutation - Creates a new shortened URL
- `findShortenedUrlByShortUrl` query - Retrieves information about an existing short URL

## Development Process

During development:
1. The React app runs on http://localhost:3000
2. The Spring Boot API runs on http://localhost:8080
3. API requests from React are proxied to the Spring Boot server
4. The `proxy` setting in package.json handles the forwarding of requests

## Production Deployment

For production:
1. Build the React app with `npm run build`
2. Copy the build files to the Spring Boot static directory
3. The Spring Boot application serves both the frontend and API
