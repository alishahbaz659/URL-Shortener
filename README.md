# URL Shortener Application

<div align="center">
  
## 📺 Demo Video
[![URL Shortener API Demo](https://img.youtube.com/vi/XfzWEvYcIqc/0.jpg)](https://www.youtube.com/watch?si=cdWiwxqS5SSaVVD6&v=XfzWEvYcIqc&feature=youtu.be&themeRefresh=1)
  
**▶️ Click the image above to watch the demo video**

</div>

This project is a full-stack URL shortener service with a Spring Boot backend and React frontend.

## Project Structure

The project is organized into two main parts:

- **Backend**: Spring Boot application with GraphQL API
- **Frontend**: React application with Apollo Client

## Tech Stack

* **Backend:** Java 17+, Spring Boot, GraphQL API, MySQL
* **Frontend:** React, TypeScript, Apollo Client
* **Build Tools:** Maven (backend), npm (frontend)

## Getting Started

### Prerequisites

* **Java Development Kit (JDK):** Version 17 or higher
* **Maven:** For building the Spring Boot application
* **MySQL:** Running MySQL server
* **Node.js:** Version 14+ and npm for the React frontend

### Development Setup

#### Backend

1. Configure the database in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name?serverTimezone=UTC
   spring.datasource.username=your_database_username
   spring.datasource.password=your_database_password
   ```

2. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   The API will be available at http://localhost:8080.

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will be available at http://localhost:3000.

### Building for Production

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Copy the frontend build files to the Spring Boot static directory:
   ```bash
   mkdir -p ../src/main/resources/static
   cp -r build/* ../src/main/resources/static/
   ```

3. Build the Spring Boot application:
   ```bash
   cd ..
   ./mvnw clean package
   ```

4. Run the packaged application:
   ```bash
   java -jar target/urlShortenerApi-0.0.1-SNAPSHOT.jar
   ```

## Features

* **URL Shortening:** Create short URLs from long ones
* **URL Lookup:** Retrieve information about shortened URLs
* **URL Redirection:** Access original URLs via the shortened version

## API Documentation

### GraphQL Endpoints

* **Mutation:** `shortenUrl(originalUrl: String!): ShortenedUrl!`
* **Query:** `findShortenedUrlByShortUrl(shortUrl: String!): ShortenedUrl`

### REST Endpoints

* **Redirect:** GET `/r/{shortUrl}` - Redirects to the original URL

## Future Enhancements

* Analytics for URL clicks
* Custom short URLs
* User authentication
* URL expiration
