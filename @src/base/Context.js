
import { Notes } from './Notes';
import { Settings } from './Settings';
import { Tones } from './Tones';
import { Piano } from './Piano';
import { PianoMouse } from './PianoMouse';
import { PianoTouches } from './PianoTouches';
import { KeyboardKeys } from './KeyboardKeys';
import { ContentKeysInterval } from './Constants';
import { PianoKeyboard } from './PianoKeyboard';


let context = undefined;

export function createContext() {

    if (context) return context;

    const notes = new Notes();
    const keyboardKeys = new KeyboardKeys();
    const settings = new Settings();
    const tones = new Tones();
    const piano = new Piano(tones, notes);
    const pianoMouse = new PianoMouse(piano);
    const pianoTouches = new PianoTouches(piano);
    const pianoKeyboard = new PianoKeyboard(piano, keyboardKeys);

    settings.onChange( (key, interval) => {
        if (key === ContentKeysInterval && interval && interval.from) {
            keyboardKeys.resolveNotesBinding(interval, notes);
        }
    });

    return context = {
        notes,
        keyboardKeys,
        settings,
        tones,
        piano,
        pianoMouse,
        pianoTouches,
        pianoKeyboard
    }
}