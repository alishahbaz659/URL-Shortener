import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faExclamationTriangle, 
  faSpinner, 
  faInfoCircle, 
  faLink, 
  faExternalLinkAlt, 
  faCalendarAlt,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';

// GraphQL query to find a shortened URL
const FIND_URL = gql`
  query FindShortenedUrl($shortUrl: String!) {
    findShortenedUrlByShortUrl(shortUrl: $shortUrl) {
      id
      shortUrl
      originalUrl
      creationDate
    }
  }
`;

const UrlLookup: React.FC = () => {
  const [shortCode, setShortCode] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const [findUrl, { loading, error, data }] = useLazyQuery(FIND_URL, {
    onError: (error) => {
      setValidationError(`Error: ${error.message}`);
    }
  });

  // Get the API host based on environment
  const getApiHost = () => {
    return process.env.NODE_ENV === 'development' 
      ? 'http://localhost:8080'
      : window.location.origin;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    
    if (!shortCode.trim()) {
      setValidationError("Please enter a short URL or code");
      return;
    }
    
    // Extract just the code part if a full URL was pasted
    let code = shortCode;
    
    if (shortCode.includes('/r/')) {
      // Handle URLs with our redirect path
      code = shortCode.split('/r/').pop() || '';
    } else if (shortCode.includes('/')) {
      // Handle legacy or other formats
      code = shortCode.split('/').pop() || '';
    }
    
    if (!code) {
      setValidationError("Invalid URL format");
      return;
    }
    
    findUrl({ variables: { shortUrl: code } });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="url-lookup">
      <h2><FontAwesomeIcon icon={faSearch} className="section-icon" /> Lookup URL Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a short URL or code"
            aria-label="Short URL or code to lookup"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="button-icon" />
                Searching...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSearch} className="button-icon" />
                Lookup
              </>
            )}
          </button>
        </div>
      </form>
      
      {validationError && (
        <div className="error-message" role="alert">
          <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" /> {validationError}
        </div>
      )}
      
      {error && !validationError && (
        <div className="error-message" role="alert">
          <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" /> Error: {error.message}
        </div>
      )}
      
      {data && data.findShortenedUrlByShortUrl ? (
        <div className="result">
          <h3><FontAwesomeIcon icon={faInfoCircle} className="result-icon" /> URL Information</h3>
          <div className="url-info">
            <p>
              <strong><FontAwesomeIcon icon={faLink} /> Short URL</strong>
              <a href={`${getApiHost()}/r/${data.findShortenedUrlByShortUrl.shortUrl}`} target="_blank" rel="noopener noreferrer">
                {`${getApiHost()}/r/${data.findShortenedUrlByShortUrl.shortUrl}`}
                <FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" />
              </a>
            </p>
            <p>
              <strong><FontAwesomeIcon icon={faExternalLinkAlt} /> Original URL</strong>
              <a href={data.findShortenedUrlByShortUrl.originalUrl} target="_blank" rel="noopener noreferrer">
                {data.findShortenedUrlByShortUrl.originalUrl}
                <FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" />
              </a>
            </p>
            <p>
              <strong><FontAwesomeIcon icon={faCalendarAlt} /> Created</strong>
              <span>{formatDate(data.findShortenedUrlByShortUrl.creationDate)}</span>
            </p>
          </div>
        </div>
      ) : data && (
        <div className="not-found">
          <FontAwesomeIcon icon={faQuestionCircle} size="2x" className="not-found-icon" />
          <p>No URL found with that code</p>
          <p>Please check the code and try again</p>
        </div>
      )}
    </div>
  );
};

export default UrlLookup; 