
import { React } from '../../chunk-e.js';
import { Content } from '../base/Content.jsx';
import { PianoOffset } from './PianoOffset.jsx';
import { WhiteKey, BlackKey } from './Keys.jsx';
import { Context } from '../base/Context.jsx';
import { PixelHeight, PixelWidth } from '../../base/Constants.js';
import { strictSize } from '../../base/Utils.js';
import { Octaves, OctaveNames } from './Octaves.jsx';



export const Piano = () => {

    const { settings, notes } = React.useContext(Context);

    const [ size, setSize ] = React.useState(settings.pwPianoSize());

    React.useEffect(() => settings.onChange((key) => {
        if (key === PixelHeight || key === PixelWidth) setSize(settings.pwPianoSize());
    }), []);

    const { width, height } = size;

    const whiteKeyBounds = settings.pxWhiteKeyBounds();
    const blackKeyBounds = settings.pxBlackKeyBounds();

    const keyWidth = settings.pwKeyOuterWidth();
    const offsetY = settings.phOctaveOuterHeight();

    return (
        <Content>
            <PianoOffset>
                <OctaveNames/>
                <svg viewBox={`0 0 ${width} ${height}`} style={strictSize(width, height)} xmlns="http://www.w3.org/2000/svg">
                    <Octaves/>
                    { notes.map( function (note) {
                            if (note.white) {
                                return (<WhiteKey key={note.name} note={note} offsetY={offsetY} bounds={whiteKeyBounds}/>);
                            } else {
                                return (<BlackKey key={note.name} note={note} offsetY={offsetY} bounds={blackKeyBounds} whiteOuterWidth={keyWidth}/>);
                            }
                        })
                    }
                </svg>
            </PianoOffset>
        </Content>
    );
};