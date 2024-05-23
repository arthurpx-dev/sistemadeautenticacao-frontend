import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { MatCardModule } from '@angular/material/card';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

import { UserService } from '../../services/user.service';
import { catchError, map } from 'rxjs';

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

    private userService: UserService
  ) {
    this.login = this.fb.group({
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

  encontrarUsuario(email: string, password: string): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        const usuarioEncontrado = users.find(
          (user) => user.email === email && user.password === password
        );
        if (!usuarioEncontrado) {
          this.errorMessage = 'Credenciais inválidas';
          return;
        }
        console.log(usuarioEncontrado);
      },
      (error) => {
        console.error('Erro ao encontrar usuário:', error);
        // Trate o erro aqui se necessário
      }
    );
  }

  closeErrorMessage(): void {
    this.errorMessage = null;
  }
}
