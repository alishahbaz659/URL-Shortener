# URL Shortener API

This project is a backend API for a URL shortener service. It allows users to shorten long URLs into shorter, more manageable links.

## Tech Stack

* **Backend:** Java 17+
* **Framework:** Spring Boot
* **API:** GraphQL
* **Database:** MySQL
* **Data Access:** Spring Data JPA
* **Build Tool:** Maven (as per initial setup)
* **Version Control:** Git

## Functionality

* **URL Shortening:** Accepts a long URL via a GraphQL mutation and generates a unique short URL.
* **Redirection:** Handles HTTP GET requests to short URLs and redirects users to the original, long URL.
* **Data Storage:** Persists the mapping between short URLs and original URLs in a MySQL database.
* **GraphQL API:** Provides a GraphQL endpoint for interacting with the URL shortening service, including:
    * **Mutation (`shortenUrl`):** Takes an `originalUrl` as input and returns the created `ShortenedUrl` object containing the `id`, `shortUrl`, `originalUrl`, and `creationDate`.
    * **Query (`findShortenedUrlByShortUrl`):** Takes a `shortUrl` as input and returns the corresponding `ShortenedUrl` object if found.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* **Java Development Kit (JDK):** Version 17 or higher. You can download it from [https://openjdk.java.net/](https://openjdk.java.net/).
* **Maven:** You can download and install Maven from [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi).
* **MySQL:** You need a running MySQL server. You can install it using your operating system's package manager or download it from [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/).
* **Git:** Make sure Git is installed on your system. You can check by running `git --version`. If not installed, download it from [https://git-scm.com/downloads](https://git-scm.com/downloads).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone YOUR_REPOSITORY_URL
    ```
    (Replace `YOUR_REPOSITORY_URL` with the URL of your GitHub repository)

2.  **Navigate to the project directory:**
    ```bash
    cd url-shortener-api
    ```

3.  **Configure the database:**
    * Open the `src/main/resources/application.properties` file.
    * Update the following properties with your MySQL database details:
        ```properties
        spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name?serverTimezone=UTC
        spring.datasource.username=your_database_username
        spring.datasource.password=your_database_password
        ```
        (Replace `your_database_name`, `your_database_username`, and `your_database_password` with your actual database credentials.)

4.  **Build the project using Maven:**
    ```bash
    mvn clean install
    ```

### Running the Application

1.  **Run the Spring Boot application:** You can do this in a few ways:
    * **Using Maven:**
        ```bash
        mvn spring-boot:run
        ```
    * **From your IDE:** Most Java IDEs (like IntelliJ IDEA, Eclipse) allow you to run the main application class (`YourApplicationNameApplication.java`, usually located in the root of your main source package).

2.  **Accessing the GraphQL API:**
    * Once the application is running, you can access the GraphQL endpoint typically at `http://localhost:8080/graphql`.
    * You can use tools like Postman or an in-browser GraphQL IDE (often available at `http://localhost:8080/graphiql` - check your application logs) to send GraphQL queries and mutations.

3.  **Testing Redirection:**
    * After shortening a URL using the `shortenUrl` mutation, you will receive a `shortUrl`. You can then try accessing this short URL in your web browser (e.g., `http://localhost:8080/yourShortKey`). You should be redirected to the original URL.

## Future Enhancements

* Implement more sophisticated and scalable short key generation strategies.
* Add analytics to track clicks on short URLs.
* Allow users to create custom short URLs.
* Implement URL expiration dates.
* Add security features.
* Develop a React-based front-end for user interaction.
