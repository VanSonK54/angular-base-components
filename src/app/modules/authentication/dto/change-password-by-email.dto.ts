export interface ChangePasswordByEmailDTO { 
    correlationId: string;
    password: string;
    passwordConfirm: string;
    email: string;
    emailOtp: number;
} 