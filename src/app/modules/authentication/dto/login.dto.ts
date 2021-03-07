export interface LoginDTO {
    username: string;
    password: string;
}

export interface LoginResponseDTO { 
    userName: string;
    role: string;
    actionTypes:string[];
    accessToken: string;
    refreshToken: string;
    refreshTokenExpiration: 0;
    accessTokenExpiration: 0;
}