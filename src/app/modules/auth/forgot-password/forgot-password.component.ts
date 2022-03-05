import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services';

@Component({
  selector: 'rts-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPassword!: FormGroup;
  notification = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  get f(): any {
    return this.forgotPassword.controls;
  }

  initForm(): void {
    this.forgotPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  recuperar(): void {
    if (this.forgotPassword.valid) {
      this.authService.recuperar(this.f.email.value).subscribe((result) => {
        this.notification = true;
        if (result) {
          this.message = 'Senha temporária enviada para e-mail cadastrado!';
          this.router.navigate(['/']);
        } else {
          this.message = 'E-mail não cadastrado!';
        }
      });
    }
  }

}
