import { ValidatorField } from './../../../helpers/ValidatorField';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserUdpate } from '@app/models/Identity/UserUpdate';
import { AccountService } from '@app/services/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  userUpdate = {} as UserUdpate;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.validation();
    this.carregarUsuario();
  }

  private carregarUsuario(): void {
    this.spinner.show();

    this.accountService
      .getUsuario()
      .subscribe(
        (userRetorno: UserUdpate) => {
          this.userUpdate = userRetorno;
          this.form.patchValue(this.userUpdate);
          this.toastr.success('Usuário carregado com sucesso!', 'Sucesso!');
        },
        (error: any) => {
          console.error(error);
          this.toastr.error('Erro ao carregar o usuário.', 'Erro.');
          this.router.navigate(['/dashboard']);
        }
      )
      .add(() => this.spinner.hide());
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
        userName: [''],
        titulo: ['NaoInformado', Validators.required],
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
        phoneNumber: ['', [Validators.required]],
        descricao: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(100),
          ],
        ],
        funcao: ['NaoInformado', Validators.required],
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

  // Conveniente para pegar um FormField apenas com a letra F
  get f(): any {
    return this.form.controls;
  }

  onSubmit(): void {
    this.atualizarUsuario();
  }

  atualizarUsuario() {
    this.userUpdate = { ...this.form.value };
    this.spinner.show();

    this.accountService
      .updateUsuario(this.userUpdate)
      .subscribe(
        () => {
          this.toastr.success(
            'Os dados do usuário foram alterados com sucesso!',
            'Sucesso!'
          );
        },
        (error: any) => {
          this.toastr.error('Erro ao alterar dados do usuário.', 'Erro.');
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

  public cssValidator(campo: FormGroup): any {
    return { 'is-invalid': campo.errors && campo.touched };
  }
}
