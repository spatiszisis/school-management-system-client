import { Component, OnInit } from '@angular/core';
import { LevelService } from './services/level.service';
import { StudentService } from './services/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private levelService: LevelService, private studentService: StudentService) {}

  ngOnInit(): void {
    this.levelService.getAllLevels().subscribe();
    this.studentService.getAllStudents().subscribe();
  }
}
