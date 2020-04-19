
import { Changeable } from './Changeable.js';
import { indexBy } from './Utils.js';
import { Name } from './Constants.js';


export class KeyboardKeys extends Changeable {

    constructor () {
        const keys = initializeKeys();
        super(indexBy(keys, Name));

        this.keys = keys;
        this.keysByCode = indexBy(keys, 'code');
    }

    getNameByCode (code) {
        const key = this.keysByCode[code];
        return key ? key.name : null;
    }

    getToneByCode (code) {

        const key = this.keysByCode[code];

        if (key && !key.disabled) {
            const { tone } = key;
            if (tone) {
                return tone;
            } else {
                throw new Error('Unknown tone for code: ' + code);
            }
        }

        return null;
    }

    resolveNotesBinding (interval, notes) {

        const whiteNotes = notes.filter( note => note.whiteIndex >= interval.from && note.white );
        const whiteKeys = this.keys.filter( key => key.white );

        for (let i = 0; i < whiteKeys.length; i++) {

            const wKey = whiteKeys[i];
            const wNote = whiteNotes[i];

            if (!wNote) {
                this.disabled(wKey.name, true);
                if (wKey.sharp) this.disabled(wKey.sharp, true);
                continue;
            }

            wKey.tone = wNote.name;
            this.disabled(wKey.name, false);

            if (wKey.sharp) {
                if (wNote.sharp) {
                    const bKey = this.get(wKey.sharp);
                    bKey.tone = wNote.sharp;
                    this.disabled(bKey.name, false);
                } else {
                    this.disabled(wKey.sharp, true);
                }
            }
        }

    }

    disabled (keyName, disabled) {
        this.apply(keyName, 'disabled', disabled);
    }

    pressed (keyName, pressed) {
        this.apply(keyName, 'pressed', pressed);
    }

    resolveVisibleKeys (interval) {

        const { length } = interval;

        const emptyKey = (white, index) => ({
            name: undefined,
            white,
            black: !white,
            index,
            disabled: true,
            code: '',
            pressed: false,
            alias: ''
        });


        const whiteKeys = this.keys.filter( key => key.white );

        const visibleKeys = [];

        let numberOfVisibleWhiteKeys = 0;

        const maxLength = Math.min(length, whiteKeys.length);
        for (let i = 0; i < maxLength; i++) {

            const wKey = whiteKeys[i];
            visibleKeys.push(wKey);
            numberOfVisibleWhiteKeys++;

            const isLast = (i + 1) === maxLength;
            if (!isLast && wKey.sharp) {
                visibleKeys.push(this.get(wKey.sharp));
            }
        }

        while (numberOfVisibleWhiteKeys < length) {
            visibleKeys.push(emptyKey(false, numberOfVisibleWhiteKeys));
            visibleKeys.push(emptyKey(true, numberOfVisibleWhiteKeys));
            numberOfVisibleWhiteKeys++;
        }

        return visibleKeys;
    }
}


function initializeKeys() {

    const keys = [];

    const Line0 = ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"];
    const Line0Aliases = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Back"];

    for (let bi = 0; bi < Line0.length; bi++) {
        keys.push({
            name: 'b0' + bi,
            index: bi,
            code: Line0[bi], // will be dynamic
            alias: Line0Aliases[bi],
            white: false,
            black: true,
            pressed: false,
            disabled: true
        });
    }

    const Line1 = ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Enter"];
    const Line1Aliases = ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "Enter"];

    for (let wi = 0; wi < Line1.length; wi++) {
        keys.push({
            name: 'w1' + wi,
            index: wi,
            code: Line1[wi], // will be dynamic
            alias: Line1Aliases[wi],
            white: true,
            black: false,
            pressed: false,
            disabled: true,
            flat: (Line0[wi - 1] ? 'b0' + (wi - 1) : null),
            sharp: (Line0[wi] ? 'b0' + wi : null)
        });
    }

    return keys;
}


