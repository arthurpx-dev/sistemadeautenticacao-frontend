import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatCardModule } from '@angular/material/card';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

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

    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  usuario: User = { email: '', password: '' };
  esconder: boolean = true;

  cadastroForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(5)]],
      // ocultarSenha: [true],
    });
  }

  get emailInvalido(): boolean | null {
    const email = this.cadastroForm.get('email');
    return email && email.invalid && email.touched && email.value !== '';
  }
  enviar() {
    const email = this.cadastroForm.get('email')?.value;
    const senha = this.cadastroForm.get('senha')?.value;

    if (email === 'art@gmail.com' && senha === 'senha') {
      this.router.navigate(['/inicio']);
    } else {
      window.alert('Email ou senha incorretos.');
    }
  }
}
