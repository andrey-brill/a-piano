
import { ChangeableKeys } from '../utils/ChangeableKeys.js';
import { indexBy } from '../utils/Utils.js';
import { Name, Pedal, Expand, Shrink, ShiftLeft, ShiftRight } from './Constants.js';


export class ControlKeys extends ChangeableKeys {

    constructor () {

        const controls = [];

        function add (name, title, options = {}) {
            controls.push(Object.assign({ name, title, pressed: false, disabled: false }, options));
        }

        function addIntervalAction (name, title) {
            add(name, title, { intervalAction: name });
        }

        add(Pedal, 'Soft pedal');
        addIntervalAction(Expand, 'Expand piano keyboard');
        addIntervalAction(Shrink, 'Shrink piano keyboard');
        addIntervalAction(ShiftLeft, 'Shift to left piano keyboard');
        addIntervalAction(ShiftRight, 'Shift to right piano keyboard');

        super(indexBy(controls, Name));

        this.controls = controls;
    }

    forEach (fn) {
        this.controls.forEach(fn);
    }

}
