
import { React } from '../../chunk-e.js';
import { ShadowRect } from '../base/Shadow.jsx';

import style from './Keys.m.scss';


export const PianoBlackKey = ({ note, offset, bounds }) => {

    const { whiteKeyOuterWidth, leftOffsets, topHeight } = bounds;

    const leftOffset = leftOffsets[note.letter];

    const keyOffset = {
        x: offset.x + note.index * whiteKeyOuterWidth + leftOffset,
        y: offset.y
    };

    return (
        <g className={style.black} name={name}>
            <ShadowRect className={style.shadow} offset={keyOffset} bounds={bounds}/>
            <rect
                className={style.glance}
                x={keyOffset.x + bounds.padding}
                y={keyOffset.y + bounds.padding}
                width={bounds.width}
                height={bounds.height}
                rx={bounds.radius}/>
            <rect
                className={style.key}
                x={keyOffset.x + bounds.padding}
                y={keyOffset.y + bounds.padding}
                width={bounds.width}
                height={topHeight}
                rx={bounds.radius}/>
        </g>
    );
};
