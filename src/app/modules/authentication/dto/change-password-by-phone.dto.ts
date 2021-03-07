export interface ChangePasswordByPhoneDTO { 
        correlationId: string;
        password: string;
        passwordConfirm: string;
        cellPhone: string;
        cellPhoneOtp: number;
}