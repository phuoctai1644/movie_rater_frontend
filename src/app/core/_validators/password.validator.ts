import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordValidator {
  static matching() {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      return password === confirmPassword ? null : { mustMatch: true };
    }
  }
}
