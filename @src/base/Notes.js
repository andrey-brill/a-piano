
import { NumberOfNotes, NumberOfWhiteNotes, OctaveSize } from './Constants.js';
import { Changeable } from './Changeable.js';


export class Notes extends Changeable {

    constructor () {

        const notes = initializeNotes();
        super(indexByName(notes));

        this.notes = notes;

        if (this.notes.length !== NumberOfNotes) {
            throw new Error('WTF?');
        }
    }

    map (fn) {
        return this.notes.map(fn);
    }

    pressed (noteName, pressed) {
        this.apply(noteName, 'pressed', pressed);
    }

}


function initializeNotes () {

    const C = 0, A = 5, B = 6;
    const letters = 'C,D,E,F,G,A,B'.split(',');
    const flats = '-,C#,D#,-,#F,#G,#A'.split(',');
    const sharps = 'C#,D#,-,#F,#G,#A,-'.split(',');
    const types = 'L,C,R,L,CL,CR,R'.split(',');

    function note (name, white, options = {}) {
        return Object.assign({
            name,
            white,
            black: !white,
            pressed: false
        }, options);
    }

    let whiteIndex = 0;

    function white (noteIndex, octave, options = {}) {

        const letter = letters[noteIndex];
        const flat = flats[noteIndex];
        const sharp = sharps[noteIndex];

        return note(letter + octave, true, Object.assign({
            index: whiteIndex++,
            type: types[noteIndex],
            flat: flat === '-' ? null : (flat + octave),
            sharp: sharp === '-' ? null : (sharp + octave)
        }, options));
    }

    function black (white) {
        return note(white.sharp, false, {
            index: white.index
        });
    }

    const A0 = white(A, 0, {
        type: 'L'
    });
    const As0 = black(A0);
    const B0 = white(B, 0);

    const notes = [A0, As0, B0];

    const numberOfFullOctaves = Math.floor(NumberOfWhiteNotes / OctaveSize);

    for (let octave = 1; octave <= numberOfFullOctaves; octave++) {

        for (let noteIndex = 0; noteIndex < letters.length; noteIndex++) {

            const w = white(noteIndex, octave);
            notes.push(w);

            if (w.sharp) {
                notes.push(black(w));
            }
        }
    }

    notes.push(white(C, 8, {
        type: '-'
    }));

    return notes;
}

function indexByName (notes) {

    const notesByName = {};

    for (let note of notes) {

        if (notesByName[note.name]) {
            throw new Error('Not unique note: ' + note.name);
        }

        notesByName[note.name] = note;
    }

    return notesByName;
}
