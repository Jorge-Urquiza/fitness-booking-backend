export const AUTH_ERRORS = {
  EMAIL_ALREADY_REGISTERED: 'Email is already registered',
  INVALID_CREDENTIALS: 'Invalid credentials',
  USER_NOT_FOUND: 'User not found',
} as const;

export const AUTH_SECURITY = {
  BCRYPT_SALT_ROUNDS_ENV_KEY: 'BCRYPT_SALT_ROUNDS',
  DEFAULT_BCRYPT_SALT_ROUNDS: 10,
  MIN_BCRYPT_SALT_ROUNDS: 8,
} as const;
