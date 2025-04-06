package com.urlshortener.urlShortenerApi.resolver;

import com.urlshortener.urlShortenerApi.entity.ShortenedUrl;
import com.urlshortener.urlShortenerApi.entity.ShortenedUrlRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import javax.swing.text.html.Option;
import java.util.Optional;

@Controller
public class QueryResolver {

    private final ShortenedUrlRepository shortenedUrlRepository;


    public QueryResolver(ShortenedUrlRepository shortenedUrlRepository) {
        this.shortenedUrlRepository = shortenedUrlRepository;
    }

    @QueryMapping
    public Optional<ShortenedUrl> findShortenedUrlByShortUrl (@Argument String shortUrl) {
        return shortenedUrlRepository.findByShortUrl(shortUrl);
    }
}
