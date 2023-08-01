import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordRecoveryService } from './password-recovery.service';

@Component({
  selector: 'app-password-recovery-form',
  templateUrl: './password-recovery-form.component.html',
  styleUrls: ['./password-recovery-form.component.css']
})
export class PasswordRecoveryFormComponent {
  passwordRecoveryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private passwordRecoveryService: PasswordRecoveryService
  ) {
    this.passwordRecoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.passwordRecoveryForm.invalid) {
      return;
    }

    const email = this.passwordRecoveryForm.value.email;

    // Call the password recovery service to initiate the recovery process
    this.passwordRecoveryService.initiatePasswordRecovery(email)
      .subscribe(
        () => {
          // Handle success, show a confirmation message, etc.
        },
        error => {
          // Handle error, display an error message, etc.
        }
      );
  }
}
