import { Component, OnInit } from '@angular/core';
import { Observable, distinctUntilChanged, map, mergeMap, of, take, tap } from 'rxjs';
import { LevelModalContext } from 'src/app/models/level-modal-context';
import { Level } from 'src/app/models/level.model';
import { LevelService } from 'src/app/services/level.service';
import { ModalService } from 'src/app/services/modal.service';
import { LevelModalComponent } from 'src/app/shared/modals/level-modal/level-modal.component';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss']
})
export class LevelsComponent implements OnInit {

  levels$: Observable<Level[]>;
  selectedLevel: Level;
  
  constructor(private modalService: ModalService, private levelService: LevelService) { }

  ngOnInit(): void {
    this.levels$ = this.levelService.level$;
  }

  openModal() {
    this.openLevelModal();
  }

  onEditLevel(levelId: number) {
    this.levelService.getLevel(levelId).subscribe((level: Level) => {
      this.openLevelModal(level);
    });
  }

  onDeleteLevel(levelId: number) {
    this.levelService.deleteLevel(levelId).subscribe();
  }

  onSelectedLevel(level: Level) {
    this.selectedLevel = level;
  }

  private openLevelModal(level?: Level) {
    const context = new LevelModalContext(level).getConfig();
    this.modalService.openModal(LevelModalComponent, context).subscribe();
  }

}
