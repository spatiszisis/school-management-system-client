import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericObject } from '../models/generic-object.model';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  validateForm(form: FormGroup, messages: GenericObject<GenericObject<string>>): GenericObject<string[]> {
    const formErrors: GenericObject<string[]> = {};
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      formErrors[key] = [];

      if (control && !control.valid && control.errors) {
        const msgs = messages[key] || [];
        formErrors[key] = Object.keys(control.errors)
          .map(err => msgs[err])
          .filter(msg => !!msg);
      }
    });

    return formErrors;
  }
}
