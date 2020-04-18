
import { Notes } from './Notes';
import { Settings } from './Settings';
import { Tones } from './Tones';
import { Piano } from './Piano';
import { PianoMouse } from './PianoMouse';


let context = undefined;

export function createContext() {

    if (context) return context;

    const notes = new Notes();
    const settings = new Settings();
    const tones = new Tones();
    const piano = new Piano(tones, notes);
    const pianoMouse = new PianoMouse(piano);

    return context = {
        notes,
        settings,
        tones,
        piano,
        pianoMouse
    }
}