import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatCardModule } from '@angular/material/card';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  esconder: boolean = true;

  cadastroForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      // senha: ['', [Validators.required, Validators.minLength(8)]],
      // ocultarSenha: [true],
    });
  }

  get emailInvalido(): boolean | null {
    const email = this.cadastroForm.get('email');
    return email && email.invalid && email.touched && email.value !== '';
  }
}
