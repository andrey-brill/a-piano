
import { ChangeableKeys } from '../utils/ChangeableKeys.js';
import { indexBy } from '../utils/Utils.js';
import { Name, Pedal, Expand, Shrink, ShiftLeft, ShiftRight } from './Constants.js';


export class ControlKeys extends ChangeableKeys {

    constructor () {

        const controls = [];

        function add (name, alias, title, options = {}) {
            controls.push(Object.assign({ name, alias, title, pressed: false, disabled: false }, options));
        }

        function addIntervalAction (name, alias, title, resolveIndex) {
            add(name, alias, title, { intervalAction: name, length: 1, resolveIndex });
        }

        add(Pedal, 'Pedal', 'Soft pedal', { length: 2, index: 0 });

        addIntervalAction(ShiftLeft, '<', 'Shift to left piano keyboard', length => resolveIndexInCenter(length, true));
        addIntervalAction(ShiftRight, '>', 'Shift to right piano keyboard', length => resolveIndexInCenter(length, false));

        addIntervalAction(Shrink, '-', 'Shrink piano keyboard', length => length - 2);
        addIntervalAction(Expand, '+', 'Expand piano keyboard', length => length - 1);

        super(indexBy(controls, Name));

        this.controls = controls;
    }

    forEach (fn) {
        this.controls.forEach(fn);
    }

    map (fn) {
        return this.controls.map(fn);
    }

    resolveKeyIndexes (length) {
        this.forEach ( key => {
            if (key.resolveIndex) {
                key.index = key.resolveIndex(length);
            }
        })
    }

}


function resolveIndexInCenter (length, isLeft) {

    if (length % 2 === 0) {
        const l2 = length / 2;
        return isLeft ? l2 - 1: l2;
    } else {
        const l2 = (length - 1) / 2;
        return isLeft ? l2 - 1: l2 + 1;
    }

}