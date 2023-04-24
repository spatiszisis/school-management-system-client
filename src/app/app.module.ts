import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbDatepickerModule, NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { StudentsComponent } from './pages/students/students.component';
import { LevelsComponent } from './pages/levels/levels.component';
import { StudentComponent } from './pages/student/student.component';
import { StudentModalComponent } from './shared/modals/student-modal/student-modal.component';
import { LevelModalComponent } from './shared/modals/level-modal/level-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    StudentsComponent,
    LevelsComponent,
    StudentComponent,
    StudentModalComponent,
    LevelModalComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbPopoverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
