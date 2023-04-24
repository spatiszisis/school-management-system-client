import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, find, map, mergeMap, tap } from 'rxjs';
import { Level } from '../models/level.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  protected readonly BASE_PATH = '/api/level';

  private levels: BehaviorSubject<Level[]> = new BehaviorSubject<Level[]>([]);
  public level$: Observable<Level[]> = this.levels.asObservable();
  
  constructor(private http: HttpClient) { }

  public getAllLevels(): Observable<Level[]> {
    return this.http.get<Level[]>(this.BASE_PATH).pipe(
      map((json: Level[]) => json),
      tap((levels: Level[]) => this.levels.next(levels))
    );
  }
  
  public getLevel(id: number): Observable<Level> {
    return this.http.get<Level>(`${this.BASE_PATH}/${id}`).pipe(
      map((json: Level) => json)
    );
  }

  public createLevel(level: Level): Observable<Level> {
    return this.http.post<Level>(this.BASE_PATH, level).pipe(
      map((json: Level) => json),
      mergeMap((level: Level) => this.getAllLevels().pipe(map(() => level)))
    );
  }

  public updateLevel(editLevel: any): Observable<Level> {
    return this.http.put<Level>(this.BASE_PATH, editLevel).pipe(
      map((json: Level) => json),
      mergeMap((level: Level) => this.getAllLevels().pipe(map(() => level)))
    );
  }

  public deleteLevel(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_PATH}/${id}`).pipe(
      mergeMap(() => this.getAllLevels().pipe(map(() => null)))
    );
  }
}
