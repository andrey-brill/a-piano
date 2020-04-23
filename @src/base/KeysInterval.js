
import { safeNumber } from '../utils/Utils';
import { MinKey, MaxKey, MinNumberOfContentKeys, IntervalActions } from './Constants';


export class KeysInterval {

    constructor (from, to) {

        if (isNaN(from) || isNaN(from)) {
            throw new Error(`Interval has invalid bounds: [${from}, ${to}]`);
        }

        this._from = safeNumber(from, MinKey, MaxKey);
        this._to = safeNumber(to, MinKey, MaxKey);
        this.length = length(this._from, this._to);

        for (let action of IntervalActions) {
            if (!this['can' + action]) {
                throw new Error('Unknown interval action: ' + action);
            }
        }
    }

    get from () {
        return this._from;
    }

    get to () {
        return this._to;
    }

    set from (_value) {
        throw new Error('Interval is immutable');
    }

    set to (_value) {
        throw new Error('Interval is immutable');
    }

    callAction = (prefix, action) => {
        const actionFn = this[prefix + action];
        if (actionFn) {
            return actionFn.call(this);
        } else {
            throw new Error('Unknown interval action: ' + action);
        }
    }

    can (action) {
        return this.callAction('can', action);
    }

    run (action) {
        return this.callAction('run', action);
    }

    canExpand () {
        return MinKey < this.from || this.to < MaxKey;
    }

    runExpand () {
        if (this.to < MaxKey) {
            return new KeysInterval(this.from, this.to + 1);
        } else if (MinKey < this.from) {
            return new KeysInterval(this.from - 1, this.to);
        } else {
            return null;
        }
    }

    canShrink () {
        return this.length > MinNumberOfContentKeys;
    }

    runShrink () {
        if (this.canShrink()) {
            return new KeysInterval(this.from, this.to - 1);
        } else {
            return null;
        }
    }

    canShiftLeft () {
        return MinKey < this.from;
    }

    runShiftLeft () {
        if (this.canShiftLeft()) {
            return new KeysInterval(this.from + 1, this.to + 1);
        } else {
            return null;
        }
    }

    canShiftRight () {
        return this.to < MaxKey;
    }

    runShiftRight () {
        if (this.canShiftRight()) {
            return new KeysInterval(this.from - 1, this.to - 1);
        } else {
            return null;
        }
    }

}


function length (fromIndex, toIndex) {
    return toIndex - fromIndex + 1;
}