
import { React } from '../../chunk-e.js';
import { ShadowRect } from '../base/ShadowRect.jsx';

import style from './Octaves.m.scss';


export const Octaves = ({ bounds, octaves }) => {
    return (
        <g>
            {octaves.map( ({ index, length, octave }) => <Octave key={octave} index={index} length={length} bounds={bounds}/> )}
        </g>
    )
};

const Octave = ({ index, length, bounds }) => {

    const { offset, octaveBounds } = resolveBounds(bounds, index, length);

    return (
        <g>
            <ShadowRect fill="#888" offset={offset} bounds={octaveBounds}/>
            <rect
                fill="#fff"
                x={offset.x + octaveBounds.padding}
                y={offset.y + octaveBounds.padding}
                width={octaveBounds.width}
                height={octaveBounds.height}
                rx={octaveBounds.radius}/>
        </g>
    )
};

export const OctaveNames = ({ bounds, octaves }) => {

    const { fontSize } = bounds;

    return (
        <div className={style.octaves} style={{ fontSize }}>
            {octaves.map( ({ index, length, octave, name }) => <OctaveName key={octave} name={name} index={index} length={length} bounds={bounds}/> )}
        </div>
    )
}

const OctaveName = ({ index, length, name, bounds }) => {

    const { offset, octaveBounds } = resolveBounds(bounds, index, length);

    const size = {
        left: offset.x + octaveBounds.padding,
        top: offset.y + octaveBounds.padding,
        width: octaveBounds.width,
        height: octaveBounds.height
    };

    return (
        <div className={style.octave} style={size}>
            <span>{name}</span>
        </div>
    )
};

function resolveBounds (bounds, index, length) {

    const { padding, radius, width, height } = bounds;

    const offset = {
        y: 0,
        x: index * (2 * padding + width)
    };

    const octaveBounds = {
        padding,
        radius,
        height,
        width: length * width + (length - 1) * (2 * padding)
    };

    return { offset, octaveBounds };
}
