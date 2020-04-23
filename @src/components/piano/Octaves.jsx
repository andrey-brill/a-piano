
import { React } from '../../chunk-e.js';
import { ShadowDiv } from '../base/Shadow.jsx';
import { AbsoluteDiv } from '../base/AbsoluteDiv.jsx';
import { strictHeight } from '../../utils/Utils.js';

import style from './Octaves.m.scss';


export const Octaves = ({ bounds, octaves }) => {

    const { fontSize, outerHeight } = bounds;

    const octavesStyle = Object.assign(strictHeight(outerHeight), {
        fontSize
    });

    return (
        <div className={style.octaves} style={octavesStyle}>
            {octaves.map( ({ index, length, octave, name }) => <Octave key={octave} name={name} index={index} length={length} bounds={bounds}/> )}
        </div>
    )
}

const Octave = ({ index, length, name, bounds }) => {

    const { padding, width } = bounds;

    const left = index * (2 * padding + width);
    const octaveWidth = length * width + (length - 1) * (2 * padding);

    return (
        <AbsoluteDiv left={left}>
            <ShadowDiv className={style.shadow} width={octaveWidth} bounds={bounds}/>
            <AbsoluteDiv className={style.octave} width={octaveWidth} bounds={bounds}>
                <span>{name}</span>
            </AbsoluteDiv>
        </AbsoluteDiv>
    )
};
