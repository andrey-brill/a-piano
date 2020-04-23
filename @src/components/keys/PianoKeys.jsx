
import { React } from '../../chunk-e.js';
import { PianoBlackKey } from './PianoBlackKey.jsx';
import { PianoWhiteKey } from './PianoWhiteKey.jsx';
import { strictHeight } from '../../utils/Utils.js';


export const PianoKeys = ({ notes, offset, outerHeight, whiteKeyBounds, blackKeyBounds }) => {

    const style = Object.assign(strictHeight(outerHeight), {
        position: 'relative'
    });

    return (
        <div style={style}>
            {
                notes.map( note => (<PianoKey key={note.name} note={note} offset={offset} whiteKeyBounds={whiteKeyBounds} blackKeyBounds={blackKeyBounds}/>))
            }
        </div>
    );
};


const PianoKey = ({ note, offset, whiteKeyBounds, blackKeyBounds }) => (
    <>
         {
            note.white ?
                (<PianoWhiteKey note={note} offset={offset} bounds={whiteKeyBounds}/>)
                :
                (<PianoBlackKey note={note} offset={offset} bounds={blackKeyBounds}/>)
        }
   </>
)