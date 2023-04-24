import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentModalContext } from 'src/app/models/student-modal-context';
import { Student } from 'src/app/models/student.model';
import { ModalService } from 'src/app/services/modal.service';
import { StudentService } from 'src/app/services/student.service';
import { StudentModalComponent } from 'src/app/shared/modals/student-modal/student-modal.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students$: Observable<Student[]>;
  selectedStudent: Student;

  constructor(private modalService: ModalService, private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.students$ = this.studentService.students$;
  }

  openModal() {
    const context = new StudentModalContext().getConfig();
    this.modalService.openModal(StudentModalComponent, context);
  }

  onEditStudent(id: number) {
    this.router.navigate(['/student', id]);
  }

  onSelectedStudent(student: Student) {
    this.selectedStudent = student;
  }

  onDeleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe();
  }

}
