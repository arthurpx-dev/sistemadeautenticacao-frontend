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
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group(
      {
        nomeCompleto: ['', Validators.required],
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
}
