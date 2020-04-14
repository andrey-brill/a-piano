
import { React } from '../../chunk-e.js';
import { KEY_WHITE_WIDTH, CORNERS_RADIUS, KEY_WHITE_HEIGHT, KEY_WHITE_SUB_HEIGHT, KEY_HALF_PADDING, KEY_WHITE_OUTER_WIDTH } from './Constants.js';



export const KeyWhite = ({ index = 0, type }) => {

    const { left, right } = resolveOriginMargin(type);
    const upper_width = KEY_WHITE_WIDTH - left - right;

    const offset = index * KEY_WHITE_OUTER_WIDTH;
    const ox = offset + KEY_HALF_PADDING, oy = ox;

    const rp = 1 + CORNERS_RADIUS; // rounder padding
    const rw = KEY_WHITE_WIDTH - 2 * rp;
    const rh = 2 * rp;



    const pathData = [
        "M19,111",
        "v1",
        "h-3",
        "v-3",
        "h1",
        "a 2 2 0 0 0 2,2",
        "z"
    ]

    const pathData2 = [
        "M1,174",
        "a 2 2 0 0 0 2,2",
        "h" + (30 - 2 * 2),
        "a 2 2 0 0 0 2,-2",
        "v" + (-65 + 2 * 2),
        "a 2 2 0 0 0 -2,-2",
        "h" + (-10),
        "a 2 2 0 0 1 -2,-2",
        "v" + (-110 + 2 * 2),
        "a 2 2 0 0 0 -2,-2",
        "h" + (-12),
        "a 2 2 0 0 0 -2,2",
        "z"
    ]

    // make <KeyPresser pressed={}><KeyNote/></KeyPresser>
    // try use one .m.scss file for sharing css classes (.white-key .white-key-shadow)
    return (
        <g className='key-white'>
            <rect fill="#888" x={ox} y={oy + KEY_WHITE_HEIGHT - CORNERS_RADIUS} width={KEY_WHITE_WIDTH} height={2 * CORNERS_RADIUS} rx={CORNERS_RADIUS}/>
            <path fill="#fff" d={pathData2.join(' ')}/>
        </g>
    );
};


const originWidth = 30.0; // width can be auto-adjusted just in svg in view-port
const originHeight = 175.0;
const originCutoutHeight = 110.0;

function createWhiteKeyPath (cx, cy, type, height) {

    const padding = 1;

    const { left, right } = resolveOriginMargin(type);
    const upperWidth = originWidth - left - right;

    const k = originCutoutHeight / originHeight; // based on design
    const cutOutHeight = Math.round(height * k);

    // const startX =

    // <path d="M3,2v1H0V0h1C1,1.1,1.9,2,3,2z"/>
}


function resolveOriginMargin (type = 'L') {

    let left = 0, right = 0;

    // Left, inCenter, Right
    switch (type) {
        case '-':
            break;
        case 'L':
            right = 14;
            break;
        case 'C':
            left = right = 6;
            break;
        case 'R':
            left = 14;
            break;
        case 'CL':
            left = 6;
            right = 10;
            break;
        case 'CR':
            right = 6;
            left = 10;
            break;
        default:
            throw new Error('Unknown note type: ' + type);
    }

    return { left, right };
}

