import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import './App.css';
import UrlShortener from './components/UrlShortener';
import UrlLookup from './components/UrlLookup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faShieldHalved, faBolt } from '@fortawesome/free-solid-svg-icons';

function App() {
  const currentYear = new Date().getFullYear();
  
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <div className="logo-icon">
            <FontAwesomeIcon icon={faLink} size="2x" className="icon-pulse" />
          </div>
          <h1>URL Shortener</h1>
          <p>Create concise, shareable links in seconds</p>
        </header>
        
        <main className="App-main">
          <div className="container">
            <div className="row">
              <div className="column">
                <UrlShortener />
              </div>
              <div className="column">
                <UrlLookup />
              </div>
            </div>
          </div>
        </main>
        
        <footer className="App-footer">
          <div className="footer-content">
            <p>&copy; {currentYear} URL Shortener | 
              <span className="footer-feature"><FontAwesomeIcon icon={faBolt} /> Fast</span>
              <span className="footer-feature"><FontAwesomeIcon icon={faShieldHalved} /> Secure</span>
            </p>
          </div>
        </footer>
      </div>
    </ApolloProvider>
  );
}

export default App;
