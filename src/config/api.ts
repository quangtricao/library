const PRODUCTION = 'https://cqtri-library.onrender.com/api/v1';
const DEVELOPMENT = 'http://localhost:1337/api/v1/';

export const API_URL = process.env.NODE_ENV === 'development' ? DEVELOPMENT : PRODUCTION;
