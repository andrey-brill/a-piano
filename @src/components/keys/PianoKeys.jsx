
import { React } from '../../chunk-e.js';
import { PianoBlackKey } from './PianoBlackKey.jsx';
import { PianoWhiteKey } from './PianoWhiteKey.jsx';
import { Container } from './Container.jsx';


export const PianoKeys = ({ notes, offset, whiteKeyBounds, blackKeyBounds }) => (
    <g>
        {
            notes.map( (note) => (
                <Container key={note.name} settings='notes' setting={note.name}>
                {
                    note.white ?
                        (<PianoWhiteKey note={note} offset={offset} bounds={whiteKeyBounds}/>)
                        :
                        (<PianoBlackKey note={note} offset={offset} bounds={blackKeyBounds}/>)
                }
                </Container>
            ))
        }
    </g>
)
