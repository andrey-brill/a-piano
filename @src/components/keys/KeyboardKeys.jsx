
import { React } from '../../chunk-e.js';
import { ShadowDiv } from '../base/Shadow.jsx';
import { AbsoluteDiv } from '../base/AbsoluteDiv.jsx';
import { KeyboardKeyContainer } from './Containers.jsx';
import { Context } from '../base/Context.jsx';

import style from './Keys.m.scss';
import { ContentKeysInterval, Sizes } from '../../base/Constants.js';
import { strictHeight } from '../../utils/Utils.js';


const KeyboardKey = ({ keyboardKey, offset, bounds }) => {

    const className = keyboardKey.white ? style.white : style.black;

    const keyOffset = {
        left: offset.left + keyboardKey.index * bounds.outerWidth,
        top: offset.top
    }

    return (
        <KeyboardKeyContainer name={keyboardKey.name} className={className} offset={keyOffset}>
            <ShadowDiv className={style.shadow} bounds={bounds}/>
            <AbsoluteDiv className={style.key + ' ' + style.keyboardKey} bounds={bounds}>
                <span>{keyboardKey.alias}</span>
            </AbsoluteDiv>
        </KeyboardKeyContainer>
    );
};


const NumberOfLines = 2;

export const KeyboardKeys = ({ offset, visibleNotes }) => {

    const { settings, keyboardKeys } = React.useContext(Context);

    const { keyOuterWidth, keyOuterHeight, keyboardKeyBounds } = settings.get(Sizes);
    const interval = settings.get(ContentKeysInterval);

    const outerHeight = NumberOfLines * keyOuterHeight;

    let leftOffset = 0;
    for (let note of visibleNotes) {
        if (note.whiteIndex === interval.from) {
            break;
        } else if (note.white) {
            leftOffset += keyOuterWidth;
        }
    }

    const visibleKeys = keyboardKeys.resolveVisibleKeys(interval);

    const style = Object.assign(strictHeight(outerHeight), {
        position: 'relative',
        fontSize: keyboardKeyBounds.fontSize,
        fontWeight: 500
    });

    const blackOffset = {
        left: offset.left + leftOffset + 0.5 * keyOuterWidth,
        top: 0
    }

    const whiteOffset = {
        left: offset.left + leftOffset,
        top: keyOuterHeight
    }

    return (
        <div style={style}>
            {
                visibleKeys.map( key => (
                    <KeyboardKey
                        key={key.name}
                        keyboardKey={key}
                        offset={key.white ? whiteOffset : blackOffset}
                        bounds={keyboardKeyBounds}/>
                ))
            }
        </div>
    );
};