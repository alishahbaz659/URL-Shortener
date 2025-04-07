package com.urlshortener.urlShortenerApi.resolver;

import com.urlshortener.urlShortenerApi.entity.ShortenedUrl;
import com.urlshortener.urlShortenerApi.entity.ShortenedUrlRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import java.util.Optional;
import java.util.Random;

@Controller
public class MutationResolver {

    private final ShortenedUrlRepository shortenedUrlRepository;
    private final Random random = new Random();
    private static final String ALPHANUMERIC_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int SHORT_URL_LENGTH = 8; // You can adjust the length

    public MutationResolver(ShortenedUrlRepository shortenedUrlRepository) {
        this.shortenedUrlRepository = shortenedUrlRepository;
    }

    @MutationMapping
    public ShortenedUrl shortenUrl(@Argument String originalUrl) {
        // Check if this URL is already one of our short URLs
        if (originalUrl.contains("/r/")) {
            throw new IllegalArgumentException("Cannot shorten an already shortened URL");
        }
        
        // Check if this original URL already exists in our database
        Optional<ShortenedUrl> existingUrl = shortenedUrlRepository.findByOriginalUrl(originalUrl);
        if (existingUrl.isPresent()) {
            return existingUrl.get(); // Return the existing shortened URL
        }
        
        // If it's a new URL, generate a new short URL
        String shortUrl = generateUniqueShortUrl();
        ShortenedUrl shortened = new ShortenedUrl(shortUrl, originalUrl);
        return shortenedUrlRepository.save(shortened);
    }

    private String generateUniqueShortUrl() {
        String shortUrl;
        do {
            shortUrl = generateRandomString(SHORT_URL_LENGTH);
        } while (shortenedUrlRepository.existsByShortUrl(shortUrl)); // Ensure uniqueness
        return shortUrl;
    }

    private String generateRandomString(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(ALPHANUMERIC_CHARS.length());
            sb.append(ALPHANUMERIC_CHARS.charAt(randomIndex));
        }
        return sb.toString();
    }
}
