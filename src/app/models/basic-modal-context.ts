import { InitModalConfig } from './init-modal-config';

export class BasicModalContext {
    config: any = {};

    constructor() { }

    getConfig(): InitModalConfig {
        return {
            initialState: {
                context: this.config,
            }
        };
    }
}
