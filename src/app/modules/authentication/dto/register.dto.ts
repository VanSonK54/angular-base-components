export interface RegisterDTO {
    captcha: string;
    userName: string;
    password: string;
    passwordConfirm: string;
    email: string;
    cellPhone: string;
    emailOtp: number;
    cellPhoneOtp: number;
    role: string;
}

export interface RegisterFormModelDTO { 
    // captcha: string;
    username: string;
    password: string;
    passwordConfirm: string;
    email: string;
    cellPhone: string;
    role: string;
}