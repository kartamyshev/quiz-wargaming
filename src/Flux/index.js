import { Flummox } from 'flummox';

import MainActions from './MainActions';
import MainStore from './MainStore';

class Flux extends Flummox {
    constructor() {
        super();

        this.createActions('main', MainActions);
        this.createStore('main', MainStore, this);
    }
}

export default new Flux();
