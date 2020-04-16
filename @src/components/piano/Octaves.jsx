
import { React } from '../../chunk-e.js';
import { ShadowRect } from './ShadowRect.jsx';
import { Context } from '../base/Context.jsx';
import { OctaveFontSize } from '../../base/Constants.js';

import style from './Octaves.m.scss';


export const Octaves = () => {

    const { settings, notes } = React.useContext(Context);

    const bounds = settings.pxOctaveBounds();

    return (
        <g>
            {notes.mapOctaves( ({ index, length, octave }) => <Octave key={octave} index={index} length={length} bounds={bounds}/> )}
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

export const OctaveNames = () => {

    const { settings, notes } = React.useContext(Context);

    const bounds = settings.pxOctaveBounds();
    const fontSize = settings.ph(OctaveFontSize);

    return (
        <div className={style.octaves} style={{ fontSize }}>
            {notes.mapOctaves( ({ index, length, octave, name }) => <OctaveName key={octave} name={name} index={index} length={length} bounds={bounds}/> )}
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

function resolveBounds(bounds, index, length) {

    const { padding, radius, keyWidth, height } = bounds;

    const offset = {
        y: 0,
        x: index * (2 * padding + keyWidth)
    };

    const octaveBounds = {
        padding,
        radius,
        height,
        width: length * keyWidth + (length - 1) * (2 * padding)
    };

    return { offset, octaveBounds };
}
