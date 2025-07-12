// Environment configuration loader
// This script should be loaded before script.js

// For development with a local server that supports environment variables
// or when using a build tool like Vite, Webpack, etc.
window.ENV = window.ENV || {};

// Alternative method: Load from a config.js file (not tracked in git)
// You can create a config.js file with:
// window.ENV = { GEMINI_API_KEY: 'your_actual_api_key_here' };

// For static hosting, you might need to set the API key directly here
// or use your hosting platform's environment variable injection
// window.ENV.GEMINI_API_KEY = 'your_api_key_here';
