export interface TokenTime {
    accessTokenTime: number,
    refreshTokenTime: number
}
export interface TokenRemainingTime {
    data: TokenTime,
    reset: Function,
    resetAccessTokenTime: Function,
    resetRefreshTokenTime: Function,
}

export let tokenRemainingTime: TokenRemainingTime = {
    data: {
        accessTokenTime: 0,
        refreshTokenTime: 0
    },
    reset(): void {
        this.data.accessTokenTime = 0;
        this.data.refreshTokenTime = 0;
    },
    resetAccessTokenTime(): void {
        this.data.accessTokenTime = 0;
    },
    resetRefreshTokenTime(): void {
        this.data.refreshTokenTime = 0;
    },

}