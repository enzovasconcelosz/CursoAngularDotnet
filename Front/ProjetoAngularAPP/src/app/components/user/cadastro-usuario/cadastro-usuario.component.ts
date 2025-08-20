import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { User } from '@app/models/Identity/User';
import { AccountService } from '@app/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss'],
})
export class CadastroUsuarioComponent implements OnInit {
  form: FormGroup = {} as FormGroup;
  user = {} as User;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.validation();
  }

  private validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.PrecisaSerIgual(
        'password',
        'confirmarPassword'
      ),
    };

    this.form = this.fb.group(
      {
        primeiroNome: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(15),
          ],
        ],
        ultimoNome: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
        email: [
          '',
          [Validators.required, , Validators.email, Validators.maxLength(40)],
        ],
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        confirmarPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
      },
      formOptions
    );
  }

  public cssValidator(campo: FormGroup): any {
    return { 'is-invalid': campo.errors && campo.touched };
  }

  public registrar(): void {
    this.user = { ...this.form.value };
    this.accountService.register(this.user).subscribe(
      () => this.router.navigateByUrl('/dashboard'),
      (error: any) => this.toastr.error(error.error)
    );
  }
}
