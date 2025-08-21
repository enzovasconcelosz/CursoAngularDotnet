import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { UserUpdate } from '@app/models/Identity/UserUpdate';
import { AccountService } from '@app/services/account.service';
import { PalestranteService } from '@app/services/palestrante.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil-detalhe',
  templateUrl: './perfil-detalhe.component.html',
  styleUrls: ['./perfil-detalhe.component.scss'],
})
export class PerfilDetalheComponent implements OnInit {
  @Output() changeFormValue = new EventEmitter();
  userUpdate = {} as UserUpdate;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public accountService: AccountService,
    public palestranteService: PalestranteService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.validation();
    this.carregarUsuario();
    this.verificarForm();
  }

  verificarForm(): void {
    this.form.valueChanges.subscribe(() =>
      this.changeFormValue.emit({ ...this.form.value })
    );
  }

  private carregarUsuario(): void {
    this.spinner.show();

    this.accountService
      .getUsuario()
      .subscribe(
        (userRetorno: UserUpdate) => {
          this.userUpdate = userRetorno;
          this.form.patchValue(this.userUpdate);
          this.toastr.success('Usuário carregado com sucesso!', 'Sucesso!');
        },
        () => {
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
        imagemURL: [''],
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

    if (this.f.funcao.value === 'Palestrante') {
      this.palestranteService.cadastrarPalestrante().subscribe(
        () =>
          this.toastr.success(
            'Função palestrante foi ativdada com sucesso!',
            'Sucesso!'
          ),
        () =>
          this.toastr.error(
            'A função palestrante não pode ser ativada.',
            'Erro.'
          )
      );
    }

    this.accountService
      .updateUsuario(this.userUpdate)
      .subscribe(
        () =>
          this.toastr.success(
            'Os dados do usuário foram alterados com sucesso!',
            'Sucesso!'
          ),
        () => this.toastr.error('Erro ao alterar dados do usuário.', 'Erro.')
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
