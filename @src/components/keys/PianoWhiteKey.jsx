
import { React } from '../../chunk-e.js';
import { PathBuilder } from '../piano/PathBuilder.js';
import { ShadowRect } from '../base/ShadowRect.jsx';


export const PianoWhiteKey = ({ note, offset, bounds }) => {

    const keyOffset = {
        x: offset.x + note.index * (2 * bounds.padding + bounds.width),
        y: offset.y
    };

    return (
        <g className='white-key' name={note.name}>
            <ShadowRect fill="#888" offset={keyOffset} bounds={bounds}/>
            <path fill="#fff" d={createWhiteKeyPathData(note, keyOffset, bounds)}/>
        </g>
    );
};

function createWhiteKeyPathData (note, offset, bounds) {

    const { height, width, padding, radius, cutoutHeight, unCutoutHeight, cutoutWidths } = bounds;

    const { wl, wc, wr } = resolveWidths(note, width, cutoutWidths);

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

    return path
        .close()
        .build();
}


function resolveWidths (note, width, cutoutWidths) {

    let [wl, wr] = cutoutWidths[note.letter];

    if (note.isFirst) {
        wl = 0;
    }

    if (note.isLast) {
        wr = 0;
    }

    return {
        wl,
        wc: width - wl - wr,
        wr
    };
}
