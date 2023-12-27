export const BASE_API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_BASE_URL_PRODUCTION
    : process.env.REACT_APP_API_BASE_URL_DEVELOPMENT;
