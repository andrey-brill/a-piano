
import { Notes } from './Notes';
import { Settings } from './Settings';
import { Tones } from './Tones';
import { Piano } from './Piano';
import { PianoMouse } from './PianoMouse';
import { PianoTouches } from './PianoTouches';
import { KeyboardKeys } from './KeyboardKeys';
import { ControlKeys } from './ControlKeys';
import { ContentKeysInterval } from './Constants';
import { PianoKeyboard } from './PianoKeyboard';
import { PianoControls } from './PianoControls';


let context = undefined;

export function createContext() {

    if (context) return context;

    const notes = new Notes();
    const keyboardKeys = new KeyboardKeys();
    const controlKeys = new ControlKeys();
    const settings = new Settings();
    const tones = new Tones();
    const piano = new Piano(tones, notes);
    const pianoMouse = new PianoMouse(piano);
    const pianoTouches = new PianoTouches(piano);
    const pianoKeyboard = new PianoKeyboard(piano, keyboardKeys);
    const pianoControls = new PianoControls(piano, controlKeys, settings);

    settings.onChange( (key, interval) => {
        if (key === ContentKeysInterval && interval) {
            controlKeys.updateState(interval);
            keyboardKeys.resolveNotesBinding(interval, notes);
        }
    });

    window.focus();

    return context = {
        notes,
        keyboardKeys,
        controlKeys,
        settings,
        tones,
        piano,
        pianoMouse,
        pianoTouches,
        pianoKeyboard,
        pianoControls
    }
}