
import { React } from '../../chunk-e.js';
import { ShadowDiv } from '../base/Shadow.jsx';

import style from './Octaves.m.scss';
import { AbsoluteDiv } from '../base/AbsoluteDiv.jsx';


export const Octaves = ({ bounds, octaves }) => {

    const { fontSize } = bounds;

    return (
        <div className={style.octaves} style={{ fontSize }}>
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
