
import { React } from '../../chunk-e.js';
import { PathBuilder } from '../piano/PathBuilder.js';
import { ShadowDiv } from '../base/Shadow.jsx';
import { PianoKeyContainer } from './Containers.jsx';
import { strictSize } from '../../utils/Utils.js';

import style from './Keys.m.scss';


export const PianoWhiteKey = ({ note, offset, bounds }) => {

    const { outerWidth, outerHeight } = bounds;

    const keyOffset = {
        left: offset.left + note.index * outerWidth,
        top: 0
    };

    return (
        <PianoKeyContainer name={note.name} className={style.white} offset={keyOffset} touchable={true}>
            <ShadowDiv className={style.shadow} bounds={bounds}/>
            <svg viewBox={`0 0 ${outerWidth} ${outerHeight}`} style={strictSize(outerWidth, outerHeight)} xmlns="http://www.w3.org/2000/svg">
                <path className={style.key} d={createWhiteKeyPathData(note, bounds)}/>
            </svg>
        </PianoKeyContainer>
    );
};

function createWhiteKeyPathData (note, bounds) {

    const { height, width, padding, radius, cutoutHeight, unCutoutHeight, cutoutWidths } = bounds;

    const { wl, wc, wr } = resolveWidths(note, width, cutoutWidths);

    const d = 2 * radius, r = radius;

    const path = new PathBuilder()
        .M(padding, height + padding - radius)
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
