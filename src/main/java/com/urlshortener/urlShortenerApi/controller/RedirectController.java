package com.urlshortener.urlShortenerApi.controller;

import com.urlshortener.urlShortenerApi.entity.ShortenedUrl;
import com.urlshortener.urlShortenerApi.entity.ShortenedUrlRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Optional;

@Controller
public class RedirectController {
    private final ShortenedUrlRepository shortenedUrlRepository;

    public RedirectController(ShortenedUrlRepository shortenedUrlRepository) {
        this.shortenedUrlRepository = shortenedUrlRepository;
    }

    @GetMapping("/{shortUrl}")
    public RedirectView redirectUrl(@PathVariable String shortUrl) {
        Optional<ShortenedUrl> shortenedUrlOptional = shortenedUrlRepository.findByShortUrl(shortUrl);

        if (shortenedUrlOptional.isPresent()) {
            String originalUrl = shortenedUrlOptional.get().getOriginalUrl();
            RedirectView redirectView = new RedirectView();
            redirectView.setUrl(originalUrl);
            return redirectView;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Short URL not found");
        }
    }


}
