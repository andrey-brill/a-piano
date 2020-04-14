
import { React } from '../../chunk-e.js';
import { KeyWhite } from './KeyWhite.jsx';
import { PIANO_CONTENT_WIDTH, PIANO_CONTENT_HEIGHT } from './Constants.js';


export const Piano = () => (
    <svg width="100%" viewBox={`0 0 ${PIANO_CONTENT_WIDTH} ${PIANO_CONTENT_HEIGHT}`} xmlns="http://www.w3.org/2000/svg">
        <KeyWhite/>
    </svg>
);