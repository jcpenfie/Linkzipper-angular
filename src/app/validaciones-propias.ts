import { AbstractControl, ValidationErrors } from '@angular/forms';
export class ValidacionesPropias {
    static passwordValid(control: AbstractControl): ValidationErrors | null {

        let valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (valid.test(control.value))
            return null;
        else
            return { passwordValid: true }
    }

    static match(control: AbstractControl): ValidationErrors | null {
        const password = control.get("pass")!.value;
        const confirmPass = control.get("passConfirm")!.value;
        if (password != confirmPass) { return { 'noMatchPass': true } }
        const email = control.get("email")!.value;
        const confirmEmail = control.get("emailConfirm")!.value;
        if (email != confirmEmail) { return { 'noMatchEmail': true } }
        return null
    }
}
