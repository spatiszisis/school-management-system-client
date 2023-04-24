import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericObject } from 'src/app/models/generic-object.model';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  studentForm: FormGroup;
  private validationMessages: GenericObject<GenericObject<string>> = {
    firstName: {
      required: "First name is required."
    },
    lastName: {
      required: "Last name is required."
    },
    email: {
      required: "Email is required.",
      email: "Email is invalid."
    },
    age: {
      required: "Age is required."
    },
    phone: {
      required: "Phone is required."
    },
    levels: {
      required: "Levels is required."
    }
  };
  private formErrors: GenericObject<string[]> = {};
  private showValidationErrors = false;
  serverErrors?: GenericObject<string[]>;

  constructor(private formBuilder: FormBuilder, private formValidationService: FormValidationService) { }

  get errors(): GenericObject<string[]> {
    return this.showValidationErrors ? Utils.mergeGenericObjects(this.formErrors, this.serverErrors) : {};
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSave() {
    this.showValidationErrors = true;
    if (!this.studentForm.valid) {
      return;
    }
    console.log(this.studentForm.value);
  }

  private buildForm(): void {
    const controls = {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      levels: [[], [Validators.required]],
    }

    this.studentForm = this.formBuilder.group(controls);
    this.studentForm.valueChanges.subscribe(() => this.validateForm());
    this.validateForm();
  }

  private validateForm() {
    this.formErrors = this.formValidationService.validateForm(this.studentForm, this.validationMessages);
  }

}
