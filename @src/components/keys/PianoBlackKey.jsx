
import { React } from '../../chunk-e.js';
import { ShadowDiv } from '../base/Shadow.jsx';
import { AbsoluteDiv } from '../base/AbsoluteDiv.jsx';
import { PianoKeyContainer } from './Containers.jsx';

import style from './Keys.m.scss';


export const PianoBlackKey = ({ note, offset, bounds }) => {

    const { whiteKeyOuterWidth, leftOffsets, topHeight } = bounds;

    const leftOffset = leftOffsets[note.letter];

    const keyOffset = {
        left: offset.left + note.index * whiteKeyOuterWidth + leftOffset,
        top: 0
    }

    return (
        <PianoKeyContainer name={note.name} className={style.black} offset={keyOffset} touchable={true}>
            <ShadowDiv className={style.shadow} bounds={bounds}/>
            <AbsoluteDiv
                className={style.glance}
                bounds={bounds}/>
            <AbsoluteDiv
                className={style.key}
                bounds={bounds}
                height={topHeight}/>
        </PianoKeyContainer>
    );
};

