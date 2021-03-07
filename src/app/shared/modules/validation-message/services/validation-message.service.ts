

import { Injectable } from '@angular/core';
import { NgControl } from '@angular/forms';
import { functionResult } from 'src/app/shared/data';

@Injectable()
export class ValidationMessageService {
    getError(control: NgControl): string {
        if (control.errors) {
            let firstKey: string = Object.keys(control.errors)[0];
            let getError = DEFAULT_ERRORS[firstKey];
            return getError(control.name as string, control.errors[firstKey]);
        } else {
            return '';
        }
    }
}

export const DEFAULT_ERRORS: { [key: string]: functionResult } = {
    required: () => `This field is required`,
    requiredtrue: () => `You should select at least an item`,
    minlength: () => `Character are less than allowed`,
    maxlength: () => `Character are more than allowed`,
    min: (controlName: string, { min, actual: any }) => `Min value for ${controlName} is ${min}`,
    max: (controlName: string, { max, actual: any }) => `Max value for ${controlName} is ${max}`,
    email: () => 'Your email is not correct',
    pattern: () => `You Input doesn't match pattern`,
    // custom validators
    mustMatch: () => 'Passwords must match',
    isTaken: () => 'This username is already taken',
}
