import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { MatCardModule } from '@angular/material/card';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

import { catchError, map, of, tap } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    CadastroComponent,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  usuario: User = { email: '', password: '' };
  esconder: boolean = true;
  errorMessage: string | null = null;

  login: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,

    private loginService: LoginService
  ) {
    this.login = this.fb.group({
      id: ['', []],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(5)]],
      // ocultarSenha: [true],
    });
  }

  get emailInvalido(): boolean | null {
    const email = this.login.get('email');
    return email && email.invalid && email.touched && email.value !== '';
  }

  ngOnInit(): void {}

  encontrarUsuario(): void {
    if (this.login.valid) {
      const { email, senha } = this.login.value;

      this.loginService
        .login(email, senha)
        .pipe(
          tap((response) => {
            console.log('Usuário encontrado:', response);
            this.router.navigate(['/inicio']);
          }),
          catchError((error) => {
            return error;
          })
        )
        .subscribe();
    } else {
      this.login.markAllAsTouched();
    }
  }

  closeErrorMessage(): void {
    this.errorMessage = null;
  }
}
