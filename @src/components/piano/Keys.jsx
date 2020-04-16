
import { React } from '../../chunk-e.js';
import { KeyWidth, WhiteKeyHeight, WhiteKeyCutoutHeight, BlackKeyTopHeight, BlackKeyHeight, KeyOuterWidth } from '../../base/Constants.js';
import { PathBuilder } from './PathBuilder.js';
import { ShadowRect } from './ShadowRect.jsx';


const DefaultOffset = Object.freeze({ x: 0, y: 0 });


export const WhiteKey = ({ note, offsetY, bounds }) => {

    // make <KeyState pressed={}><KeyNote/>
    // try use one .m.scss file for sharing css classes (.white-key .white-key-shadow)

    const offset = {
        x: note.index * (2 * bounds.padding + bounds.width),
        y: offsetY
    };

    return (
        <g className='white-key' name={note.name}>
            <ShadowRect fill="#888" offset={offset} bounds={bounds}/>
            <path fill="#fff" d={createWhiteKeyPathData(note.type, offset, bounds)}/>
        </g>
    );
};


const BlackKeyOffsetFromIndex = {
    C: 19,
    D: 27,
    F: 19,
    G: 23,
    A: 27
}

function calcBlackOffsetX (note, whiteOuterWidth) {

    const offset = BlackKeyOffsetFromIndex[note.letter] / KeyOuterWidth;
    if (isNaN(offset)) {
        console.log('note', note);
        throw new Error();
    }

    return (note.index + offset) * whiteOuterWidth;
}

export const BlackKey = ({ note, offsetY, bounds, whiteOuterWidth }) => {

    // make <KeyState pressed={}><KeyNote/>
    // try use one .m.scss file for sharing css classes (.white-key .white-key-shadow)

    const offset = {
        x: calcBlackOffsetX(note, whiteOuterWidth),
        y: offsetY
    };

    const topHeight = bounds.height * BlackKeyTopHeight / BlackKeyHeight;

    return (
        <g className='black-key' name={name}>
            <ShadowRect fill="#444" offset={offset} bounds={bounds}/>
            <rect
                fill="#555"
                x={offset.x + bounds.padding}
                y={offset.y + bounds.padding}
                width={bounds.width}
                height={bounds.height}
                rx={bounds.radius}/>
            <rect
                fill="#333"
                x={offset.x + bounds.padding}
                y={offset.y + 3 * bounds.padding}
                width={bounds.width}
                height={topHeight - 2 * bounds.padding}
                rx={bounds.radius}/>
        </g>
    );
};

function createWhiteKeyPathData (type, offset = DefaultOffset, bounds) {

    const { height, width, padding, radius } = bounds;

    const { wl, wc, wr } = resolveWidths(type, width);

    const k = WhiteKeyCutoutHeight / WhiteKeyHeight;
    const cutoutHeight = height * k;
    const unCutoutHeight = height - cutoutHeight;

    const d = 2 * radius, r = radius;

    const path = new PathBuilder()
        .M(offset.x + padding, offset.y + height + padding - radius)
        .a(r,r)
        .h(width - d)
        .a(r,-r)

    if (wr > 0) {
        path
            .v(-unCutoutHeight + d)
            .a(-r,-r)
            .h(- wr + d)
            .a(-r,-r, 1)
            .v(- cutoutHeight + d);
    } else {
        path
            .v(-height + d)
    }

    path
        .a(-r,-r)
        .h(- wc + d)
        .a(-r, r);

    if (wl > 0) {
        path
            .v(cutoutHeight - d)
            .a(-r, r, 1)
            .h(- wl + d)
            .a(-r, r)
            .v(unCutoutHeight - d);
    } else {
        path
            .v(height - d);
    }

    path.close();
    return path.build();
}


function resolveWidths (type = 'L', width) {

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

    const wl = left * width / KeyWidth;
    const wr = right * width / KeyWidth;
    return {
        wl,
        wc: width - wl - wr,
        wr
    };
}

