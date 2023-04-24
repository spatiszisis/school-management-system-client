import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';
import { LevelsComponent } from './pages/levels/levels.component';
import { StudentComponent } from './pages/student/student.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'students' },
  {
    path: 'students', component: StudentsComponent,
  },
  {
    path: 'student/:id', component: StudentComponent,
  },
  {
    path: 'levels', component: LevelsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
