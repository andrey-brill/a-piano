
import { ContentKeysInterval } from './Constants';


export class PianoKeyboard {

    constructor (piano, keyboardKeys, settings) {

        this.piano = piano;
        this.keyboardKeys = keyboardKeys;

        this.pressedKeys = {};

        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);

        settings.onChange( (key, interval) => {
            if (key === ContentKeysInterval && interval) {
                keyboardKeys.resolveNotesBinding(interval);
            }
        });
    }

    onKeyDown = (e) => {

        const { code } = e;
        if (!code) {
            return;
        }

        const name = this.keyboardKeys.getNameByCode(code);
        if (name) {
            e.preventDefault();
        } else {
            return;
        }

        if (this.pressedKeys[code]) {
            return;
        }

        const tone = this.keyboardKeys.getToneByCode(code);
        if (tone) {
            this.pressedKeys[code] = { tone, name };
            this.piano.triggerAttack(tone);
            this.keyboardKeys.pressed(name, true);
        }

    }

    onKeyUp = (e) => {

        const { code } = e;
        const info = this.pressedKeys[code];
        if (info) {
            e.preventDefault();
            this.piano.triggerRelease(info.tone);
            this.keyboardKeys.pressed(info.name, false);
            delete this.pressedKeys[code];
        }

    }

}