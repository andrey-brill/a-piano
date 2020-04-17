
import { React } from '../../chunk-e.js';
import { Content } from '../base/Content.jsx';
import { PianoKeys } from '../keys/PianoKeys.jsx';
import { Context } from '../base/Context.jsx';
import { Sizes, ContentKeysInterval, VisibleKeysInterval } from '../../base/Constants.js';
import { strictSize } from '../../base/Utils.js';
import { OctaveNames, Octaves } from './Octaves.jsx';



export const Piano = () => {

    const { settings, notes } = React.useContext(Context);

    const [ sizes, setSizes ] = React.useState(settings.get(Sizes));

    React.useEffect(() => settings.onChange((key) => {
        if (key === Sizes) setSizes(settings.get(Sizes));
    }), []);

    const { width, height } = sizes.pianoOuterSize;

    const { keyOuterWidth, whiteKeyBounds, blackKeyBounds, octaveBounds }= sizes;

    const { visibleOffsetX, visibleNotes, visibleOctaves } = notes.resolveVisible(settings.get(ContentKeysInterval), settings.get(VisibleKeysInterval));

    const keysOffset = {
        x: visibleOffsetX * keyOuterWidth,
        y: sizes.octaveOuterHeight
    }

    return (
        <Content width={width}>
                <OctaveNames bounds={octaveBounds} octaves={visibleOctaves}/>
                <svg viewBox={`0 0 ${width} ${height}`} style={strictSize(width, height)} xmlns="http://www.w3.org/2000/svg">
                    <Octaves bounds={octaveBounds} octaves={visibleOctaves}/>
                    <PianoKeys notes={visibleNotes} offset={keysOffset} whiteKeyBounds={whiteKeyBounds} blackKeyBounds={blackKeyBounds}/>
                </svg>
        </Content>
    );
};
