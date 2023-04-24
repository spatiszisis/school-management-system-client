import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { GenericObject } from 'src/app/models/generic-object.model';
import { Level } from 'src/app/models/level.model';
import { Student } from 'src/app/models/student.model';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { LevelService } from 'src/app/services/level.service';
import { ModalService } from 'src/app/services/modal.service';
import { StudentService } from 'src/app/services/student.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
  styleUrls: ['./student-modal.component.scss']
})
export class StudentModalComponent implements OnInit {

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
  levels: Level[];

  constructor(
    private activeModal: NgbActiveModal, 
    private formBuilder: FormBuilder, 
    private formValidationService: FormValidationService, 
    private studentService: StudentService,
    private levelService: LevelService) { }

  get errors(): GenericObject<string[]> {
    return this.showValidationErrors ? Utils.mergeGenericObjects(this.formErrors, this.serverErrors) : {};
  }

  ngOnInit(): void {
    this.levelService.level$.subscribe(levels => this.levels = levels);
    this.buildForm();
  }

  onSave() {
    this.showValidationErrors = true;
    if (!this.studentForm.valid) {
      return;
    }
    const student = {
      ...this.studentForm.value,
      level: {
        levelId : this.getLevelFromCached(this.studentForm.value.level)?.id,
        name: this.getLevelFromCached(this.studentForm.value.level)?.name
      }
    }
    this.studentService.createStudent(student).subscribe(() => this.activeModal.dismiss());
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  private buildForm(): void {
    const controls = {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      level: [{}, [Validators.required]],
    }

    this.studentForm = this.formBuilder.group(controls);
    this.studentForm.valueChanges.subscribe(() => this.validateForm());
    this.validateForm();
  }

  private validateForm() {
    this.formErrors = this.formValidationService.validateForm(this.studentForm, this.validationMessages);
  }

  private getLevelFromCached(id: string): Level | undefined {
    return this.levels.find(level => level.id.toString() === id);
  }

}
