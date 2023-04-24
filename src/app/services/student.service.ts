import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  protected readonly BASE_PATH = '/api/student';

  private students: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);
  public students$: Observable<Student[]> = this.students.asObservable();

  private student: BehaviorSubject<Student> = new BehaviorSubject<Student>(new Student());
  public student$: Observable<Student> = this.student.asObservable();

  constructor(private http: HttpClient) { }

  public getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.BASE_PATH).pipe(
      map((json: Student[]) => json),
      tap((students: Student[]) => this.students.next(students))
    );
  }

  public getStudent(id: number): Observable<Student> {
    return this.http.get(`${this.BASE_PATH}/${id}`).pipe(
      map((json: any) => json.data),
      tap((student: Student) => this.student.next(student))
    );
  }

  public createStudent(student: Student): Observable<Student> {
    return this.http.post(this.BASE_PATH, student).pipe(
      map((json: any) => json.data),
      mergeMap((student: Student) => this.getAllStudents().pipe(map(() => student)))
    );
  }

  public updateStudent(studentUpdate: any): Observable<Student> {
    return this.http.put<Student>(this.BASE_PATH, studentUpdate).pipe(
      map((json: any) => json.data),
      tap((student: Student) => this.student.next(student))
    );
  }

  public deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_PATH}/${id}`).pipe(
      mergeMap(() => this.getAllStudents().pipe(map(() => null)))
    );
  }
}
