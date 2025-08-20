import { AbstractControl, FormGroup } from '@angular/forms';

export class ValidatorField {
  static PrecisaSerIgual(
    NomeDeControle: string,
    NomeDeControleIgual: string
  ): any {
    return (group: AbstractControl) => {
      const formGroup = group as FormGroup;
      const control = formGroup.controls[NomeDeControle];
      const matchingControl = formGroup.controls[NomeDeControleIgual];

      if (matchingControl.errors && !matchingControl.errors.precisaSerIgual)
        return null;

      if (control.value !== matchingControl.value)
        matchingControl.setErrors({ precisaSerIgual: true });
      else matchingControl.setErrors(null);

      return null;
    };
  }
}
