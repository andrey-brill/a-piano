
import { safeNumber } from './Utils';
import { MinKey, MaxKey } from './Constants';


export class KeysInterval {

    constructor (from, to) {
        this.from = from;
        this.to = to;
    }

    get from () {
        return this._from;
    }

    set from (value) {
        this._from = safeNumber(value, MinKey, MaxKey);
        this.updateLength();
        return value;
    }

    get to () {
        return this._to;
    }

    set to (value) {
        this._to = safeNumber(value, MinKey, MaxKey);
        this.updateLength();
        return value;
    }

    updateLength () {
        if (this._from != null && this._to != null) {
            this.length = this._to - this._from + 1;
        }
    }

    // TODO add checks and validation

}