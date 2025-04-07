package com.urlshortener.urlShortenerApi.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShortenedUrlRepository extends JpaRepository<ShortenedUrl, Long> {

    Optional<ShortenedUrl> findByShortUrl(String shortUrl);

    boolean existsByShortUrl(String shortUrl);

    Optional<ShortenedUrl> findByOriginalUrl(String originalUrl);
}
