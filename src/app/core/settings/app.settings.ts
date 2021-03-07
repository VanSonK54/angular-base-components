/**
 * OTP
 */
export const OTP_EXPIRATION_TIME = 120;
export const OTP_CODE_LENGTH = 10;

/**
 * Text
 */
export const UNKNOWN_ERROR_MESSAGE = 'Something went wrong!';

/**
 * Tokens
 */export interface TimeLimit {
    min: number,
    max: number
}

export const REFRESH_TOKEN_REQUEST_TIME_LIMIT: TimeLimit = {
    min: 0.05, // 100% - 95%
    max: 0.4 // 100% - 60%
}