import { AbstractControl, ValidationErrors } from "@angular/forms";
import { REGEX } from "../data";

export let phoneOrEmailValidator = (control: AbstractControl): ValidationErrors | null => {
    let phoneNumberRegexp = new RegExp(REGEX.cellphone);
    let emailRegexp = new RegExp(REGEX.email);
    if (phoneNumberRegexp.test(control.value) || emailRegexp.test(control.value)) {
        return null;
    } else {
        return { pattern: true };
    }
}
