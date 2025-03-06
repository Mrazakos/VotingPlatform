import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // Sometimes necessary
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-register',
  "styles": [
  "src/styles.css"
  ],
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatCardModule,
      MatIconModule,
      RouterModule,
    ],
  styleUrls: ['../auth.component.css'],
  templateUrl: './register.component.html',
  standalone: true
})
export class RegisterComponent {
  registerForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordAgain: ['', [Validators.required]],
    });
  }

  onRegister(): void {
    if (this.registerForm.valid && this.registerForm.value.password === this.registerForm.value.passwordAgain) {
      this.authService.register(this.registerForm.value.email, this.registerForm.value.password);
    }
  }
}
