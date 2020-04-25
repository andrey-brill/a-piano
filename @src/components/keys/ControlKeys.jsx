
import { React } from '../../chunk-e.js';
import { ShadowDiv } from '../base/Shadow.jsx';
import { AbsoluteDiv } from '../base/AbsoluteDiv.jsx';
import { ControlKeyContainer } from './Containers.jsx';
import { Context } from '../base/Context.jsx';
import { ContentKeysInterval, Sizes } from '../../base/Constants.js';
import { strictHeight } from '../../utils/Utils.js';

import style from './Keys.m.scss';


const ControlKey = ({ controlKey, offset, bounds }) => {

    const keyOffset = {
        left: offset.left + controlKey.index * bounds.outerWidth,
        top: offset.top
    }

    const keyBounds = Object.assign({}, bounds, {
        width: controlKey.length * bounds.width + (controlKey.length - 1) * 2 * bounds.padding
    });

    return (
        <ControlKeyContainer name={controlKey.name} className={style.white} offset={keyOffset} touchable={true}>
            <ShadowDiv className={style.shadow} bounds={keyBounds}/>
            <AbsoluteDiv className={style.key + ' ' + style.keyboardKey} title={controlKey.title} bounds={keyBounds}>
                <span>{controlKey.alias}</span>
            </AbsoluteDiv>
        </ControlKeyContainer>
    );
};


export const ControlKeys = ({ offset, visibleNotes }) => {

    const { settings, controlKeys } = React.useContext(Context);

    const { keyOuterWidth, keyOuterHeight, keyboardKeyBounds } = settings.get(Sizes);

    const interval = settings.get(ContentKeysInterval);

    let leftKeysOffset = 0;
    for (let note of visibleNotes) {
        if (note.whiteIndex === interval.from) {
            break;
        } else if (note.white) {
            leftKeysOffset += keyOuterWidth;
        }
    }

    controlKeys.resolveKeyIndexes(interval.length);

    const style = Object.assign(strictHeight(keyOuterHeight), {
        position: 'relative',
        fontSize: keyboardKeyBounds.fontSize,
        fontWeight: 500
    });

    const controlKeyOffset = {
        left: offset.left + leftKeysOffset,
        top: offset.top
    }

    return (
        <div style={style}>
            {
                controlKeys.map( (key) => (
                    <ControlKey
                        key={key.name}
                        controlKey={key}
                        offset={controlKeyOffset}
                        bounds={keyboardKeyBounds}/>
                ))
            }
        </div>
    );
};