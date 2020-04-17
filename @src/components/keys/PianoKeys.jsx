
import { React } from '../../chunk-e.js';
import { PianoBlackKey } from './PianoBlackKey.jsx';
import { PianoWhiteKey } from './PianoWhiteKey.jsx';


export const PianoKeys = ({ notes, offset, whiteKeyBounds, blackKeyBounds }) => (
    <g>
        {
            notes.map( function (note) {
                if (note.white) {
                    return (<PianoWhiteKey key={note.name} note={note} offset={offset} bounds={whiteKeyBounds}/>);
                } else {
                    return (<PianoBlackKey key={note.name} note={note} offset={offset} bounds={blackKeyBounds}/>);
                }
            })
        }
    </g>
)
