import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatCardModule } from '@angular/material/card';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpErrorResponse,
  HttpResponseBase,
} from '@angular/common/http';

import { User } from '../../models/user.model';

import { authGuard } from '../../guards/auth.guard';

import { catchError, tap, throwError } from 'rxjs';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';
import { LoginService } from '../../services/login.service';
import { AuthGuard } from '../../services/auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [LoginService],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group(
      {
        nome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(8)]],
        confirmarSenha: ['', Validators.required],
        ocultarSenha: [true],
      },
      { validators: this.senhasCombinam }
    );
  }

  private senhasCombinam(control: AbstractControl): ValidationErrors | null {
    const senha = control.get('senha')?.value;
    const confirmarSenha = control.get('confirmarSenha')?.value;
    if (senha !== confirmarSenha) {
      control.get('confirmarSenha')?.setErrors({ senhasNaoCombinam: true });
      return { senhasNaoCombinam: true };
    } else {
      control.get('confirmarSenha')?.setErrors(null);
      return null;
    }
  }

  get senhasNaoCombinamErro(): boolean {
    return (
      (this.cadastroForm.get('confirmarSenha')?.touched &&
        this.cadastroForm.get('confirmarSenha')?.errors?.[
          'senhasNaoCombinam'
        ]) ??
      false
    );
  }

  get emailInvalido(): boolean | null {
    const email = this.cadastroForm.get('email');
    return email && email.invalid && email.touched && email.value !== '';
  }

  submitForm(): void {
    if (this.cadastroForm.valid) {
      const { nome, email, senha } = this.cadastroForm.value;

      this.loginService
        .signup(nome, email, senha)
        .pipe(
          tap((response) => {
            console.log('Usuário criado com sucesso:', response);
            this.router.navigate(['/login']);
          }),
          catchError((error) => {
            return error;
          })
        )
        .subscribe();
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }
}
