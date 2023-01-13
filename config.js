const GOOGLE_CLIENT_ID = process.env.CLIENT_APP_ID;

const GOOGLE_CLIENT_SECRET = process.env.CLIENT_APP_SECRET;

const SERVER_ROOT_URI = process.env.SERVER_ROOT_URI || "http://localhost:3001";

const JWT_SECRET = "mysecret";

const COOKIE_NAME = "auth_token";

const GOOGLE_REDIRECT_URI = `/google/callback`;

module.exports = {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_ROOT_URI,
  JWT_SECRET,
  COOKIE_NAME,
  GOOGLE_REDIRECT_URI,
};
