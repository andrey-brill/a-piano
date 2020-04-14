
import { NUMBER_OF_FULL_OCTAVES, } from './Constants';


class NotesSingleton {

    constructor () {

        const letters = 'C,D,E,F,G,A,B'.split(','),
        flats = '-,C#,D#,-,#F,#G,#A'.split(','),
        sharps = 'C#,D#,-,#F,#G,#A,-'.split(','),
        types = 'L,C,R,L,CL,CR,R'.split(','),

        const notes = [];

        function white (octave, note, type = undefined) {

            const letter = letters[note];
            const flat = flats[note];
            const sharp = sharps[note];

            notes.push({
                octave,
                letter,
                name: letter + octave,
                type: type || types[note],
                white: true,
                black: false
            })
        }

        notes.push({
            octave: 0,
            name: 'A',
            white: true,
            black: false,
            type: 'L'
        })

        for (let octave = 1; octave <= NUMBER_OF_FULL_OCTAVES; octave++) {
            for (let note = 0; note < letters.length; note++) {

            }
        }

    }

}

export const Notes = new NotesSingleton();