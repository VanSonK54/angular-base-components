import { OtpDTO } from "src/app/modules/authentication/dto";

/**
 * @description A global variable to hold otp-model's data on RAM
 */
interface otpModelManagment {
    data: OtpDTO;
    fill: Function;
    isFilled: Function,
    reset: Function,
}
export let otpModelVariable: otpModelManagment = {
    data: {
        captcha: '',
        key: '',
        scenario: ''
    },
    fill(captcha: string, key: string, scenario: string): void {
        this.data.captcha = captcha;
        this.data.key = key;
        this.data.scenario = scenario;
    },
    isFilled(): boolean {
        return this.data.captcha !== '' &&
            this.data.key !== '' &&
            this.data.scenario !== '';
    },
    reset(): void {
        this.data.captcha = 'S';
        this.data.key = '';
        this.data.scenario = '';
    }
}

export let cellphoneOtp = {
    data: {
        code: 0,
    },
    reset() {
        this.data.code = 0;
    }
};

export let emailOtp = {
    data: {
        code: 0,
    },
    reset() {
        this.data.code = 0;
    }
};

export let correlationIdVariable = {
    data: {
        id: '',
    },
    reset() {
        this.data.id = '';
    }
}
