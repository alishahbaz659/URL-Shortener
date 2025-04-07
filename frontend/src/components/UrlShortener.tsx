import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faCopy, faCheck, faSpinner, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

// GraphQL mutation for shortening a URL
const SHORTEN_URL = gql`
  mutation ShortenUrl($originalUrl: String!) {
    shortenUrl(originalUrl: $originalUrl) {
      id
      shortUrl
      originalUrl
      creationDate
    }
  }
`;

const UrlShortener: React.FC = () => {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const [shortenUrl, { loading, error }] = useMutation(SHORTEN_URL, {
    onCompleted: (data) => {
      // Get the API host based on environment
      const apiHost = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8080'
        : window.location.origin;
        
      // Construct the full short URL with the /r/ prefix for redirects
      setShortenedUrl(`${apiHost}/r/${data.shortenUrl.shortUrl}`);
    },
    onError: (error) => {
      // Extract and format the error message
      const errorMessage = error.message.includes('Cannot shorten an already shortened URL')
        ? 'Cannot shorten an already shortened URL'
        : `Error: ${error.message}`;
      setValidationError(errorMessage);
    }
  });

  const validateUrl = (inputUrl: string): boolean => {
    setValidationError(null);
    
    // Check if it's a valid URL
    try {
      new URL(inputUrl);
    } catch (e) {
      setValidationError("Please enter a valid URL including http:// or https://");
      return false;
    }
    
    // Check if it's already one of our shortened URLs
    const apiHost = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:8080'
      : window.location.origin;
      
    if (inputUrl.includes(`${apiHost}/r/`) || inputUrl.includes('/r/')) {
      setValidationError("Cannot shorten an already shortened URL");
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && validateUrl(url)) {
      shortenUrl({ variables: { originalUrl: url } });
    }
  };

  const copyToClipboard = async () => {
    if (shortenedUrl) {
      try {
        await navigator.clipboard.writeText(shortenedUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        alert('Failed to copy URL. Please copy it manually.');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="url-shortener">
      <h2><FontAwesomeIcon icon={faLink} className="section-icon" /> Create Short URL</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your long URL here"
            aria-label="URL to shorten"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="button-icon" />
                Processing...
              </>
            ) : 'Shorten'}
          </button>
        </div>
      </form>
      
      {validationError && (
        <div className="error-message" role="alert">
          <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" /> {validationError}
        </div>
      )}
      
      {shortenedUrl && (
        <div className="result">
          <h3>Your shortened URL is ready!</h3>
          <div className="shortened-url-container">
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
              {shortenedUrl}
            </a>
            <button 
              onClick={copyToClipboard} 
              className="copy-button"
              aria-label="Copy to clipboard"
            >
              {copySuccess ? (
                <>
                  <FontAwesomeIcon icon={faCheck} className="button-icon success-icon" /> Copied!
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCopy} className="button-icon" /> Copy
                </>
              )}
            </button>
          </div>
          <p className="url-tip">
            Share this link with anyone, and they'll be redirected to your original URL.
          </p>
        </div>
      )}
    </div>
  );
};

export default UrlShortener; 