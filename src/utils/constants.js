export const EMAIL_PATTERN_VALIDATION = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/
export const PASSWORD_PATTERN_VALIDATION = /^.{8,}$/

export const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
export const GITHUB_OAUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user`;

export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const QENCODE_API = 'https://auth-qa.qencode.com/v1';

export const LIMIT_ERROR_LENGTH = 63;


