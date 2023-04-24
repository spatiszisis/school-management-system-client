import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GenericObject } from 'src/app/models/generic-object.model';
import { LevelModalContext } from 'src/app/models/level-modal-context';
import { Level } from 'src/app/models/level.model';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { LevelService } from 'src/app/services/level.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-level-modal',
  templateUrl: './level-modal.component.html',
  styleUrls: ['./level-modal.component.scss']
})
export class LevelModalComponent implements OnInit {

  levelForm: FormGroup;
  private validationMessages: GenericObject<GenericObject<string>> = {
    name: {
      required: "Level name is required."
    }
  };
  private formErrors: GenericObject<string[]> = {};
  private showValidationErrors = false;
  serverErrors?: GenericObject<string[]>;
  public context: LevelModalContext;
  level: Level | undefined;

  constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder, private formValidationService: FormValidationService, private levelService: LevelService) { }

  get errors(): GenericObject<string[]> {
    return this.showValidationErrors ? Utils.mergeGenericObjects(this.formErrors, this.serverErrors) : {};
  }

  ngOnInit(): void {
    this.level = this.context.level;
    this.buildForm();
  }

  onSave() {
    this.showValidationErrors = true;
    if (!this.levelForm.valid) {
      return;
    }
    const editLevel = {
      id: this.level?.id,
      level: {
        name: this.levelForm.value.name
      }
    };
    !!this.level ? this.levelService.updateLevel(editLevel).subscribe(() => this.dismiss()) : this.levelService.createLevel(this.levelForm.value).subscribe(() => this.dismiss());
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  private buildForm(): void {
    const controls = {
      name: [!!this.level ? this.level?.name : '', [Validators.required]]
    }

    this.levelForm = this.formBuilder.group(controls);
    this.levelForm.valueChanges.subscribe(() => this.validateForm());
    this.validateForm();
  }

  private validateForm() {
    this.formErrors = this.formValidationService.validateForm(this.levelForm, this.validationMessages);
  }

}
