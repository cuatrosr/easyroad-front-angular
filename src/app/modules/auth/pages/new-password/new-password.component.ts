import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['../sign-in/sign-in.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    AngularSvgIconModule,
    ButtonComponent,
    NgClass,
    NgIf,
    CardModule,
  ],
})
export class NewPasswordComponent {
  form!: FormGroup;
  passwordTextType!: boolean;
  submitted = false;
  loading = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      contrasena: ['', Validators.required],
      nueva_contrasena: ['', Validators.required],
      confirmacion_contrasena: ['', Validators.required],
    });
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  get f() {
    return this.form.controls;
  }

  cambioContrasena() {
    this.loading = true;
    this.submitted = true;

    const { contrasena, nueva_contrasena, confirmacion_contrasena } = this.form.value;

    if (this.form.invalid) {
      return;
    }
  }
}
