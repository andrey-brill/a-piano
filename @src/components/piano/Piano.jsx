
import { React } from '../../chunk-e.js';
import { Content } from '../base/Content.jsx';
import { PianoKeys } from '../keys/PianoKeys.jsx';
import { Context } from '../base/Context.jsx';
import { Sizes, ContentKeysInterval, VisibleKeysInterval } from '../../base/Constants.js';
import { Octaves } from './Octaves.jsx';
import { KeyboardKeys } from '../keys/KeyboardKeys.jsx';


export const Piano = () => {

    const { settings, notes } = React.useContext(Context);

    const [ sizes, setSizes ] = React.useState(settings.get(Sizes));

    React.useEffect(() => settings.onChange((key) => {
        if (key === Sizes) setSizes(settings.get(Sizes));
    }), []);

    const { width, height } = sizes.pianoOuterSize;

    const { keyOuterWidth, whiteKeyBounds, blackKeyBounds, octaveBounds }= sizes;

    const { visibleOffsetX, visibleNotes, visibleOctaves } = notes.resolveVisible(settings.get(ContentKeysInterval), settings.get(VisibleKeysInterval));

    const offset = {
        left: visibleOffsetX * keyOuterWidth,
        top: 0
    }

    return (
        <Content width={width}>

                <Octaves bounds={octaveBounds} octaves={visibleOctaves}/>

                <PianoKeys
                        outerHeight={height}
                        offset={offset}
                        notes={visibleNotes}
                        whiteKeyBounds={whiteKeyBounds}
                        blackKeyBounds={blackKeyBounds}/>

                <KeyboardKeys offset={offset} visibleNotes={visibleNotes}/>

        </Content>
    );
};
