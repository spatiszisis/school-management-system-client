import { Injectable, Type } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, from, of} from 'rxjs';
import { catchError} from 'rxjs/operators';
import { InitModalConfig } from '../models/init-modal-config';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NgbModal) { }

  openModal(component: Type<any>, context: InitModalConfig): Observable<any> {
    const cont = context.initialState.context;
    const modalRef = this.modalService.open(component, { ariaLabelledBy: 'modal-title' });
    modalRef.componentInstance.context = cont;

    return from(modalRef.result).pipe(catchError(() => of(false)));
  }

}
