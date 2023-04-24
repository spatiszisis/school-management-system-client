import { BasicModalContext } from './basic-modal-context';
import { Level } from './level.model';

export class LevelModalContext extends BasicModalContext {
    constructor(public level?: Level) {
        super();
        this.config = { level };
    }
}
