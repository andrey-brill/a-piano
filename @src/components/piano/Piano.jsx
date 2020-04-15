
import { React } from '../../chunk-e.js';
import { Content } from '../base/Content.jsx';
import { PianoOffset } from './PianoOffset.jsx';
import { WhiteKey } from './Keys.jsx';
import { Context } from '../base/Context.jsx';
import { PixelHeight, PixelWidth } from '../../base/Constants.js';
import { strictSize } from '../../base/Utils.js';



export const Piano = () => {

    const { settings, notes } = React.useContext(Context);

    const [ size, setSize ] = React.useState(settings.pwPianoSize());

    React.useEffect(() => settings.onChange((key) => {
        if (key === PixelHeight || key === PixelWidth) setSize(settings.pwPianoSize());
    }), []);

    const { width, height } = size;

    const whiteKeyBounds = settings.pxWhiteKeyBounds();
    const keyWidth = settings.pwKeyOuterWidth();
    const offsetY = settings.phOctaveOuterHeight();

    return (
        <Content>
            <PianoOffset>
                <svg viewBox={`0 0 ${width} ${height}`} style={strictSize(width, height)} xmlns="http://www.w3.org/2000/svg">
                    { notes.map(
                        (note) => (
                            note.white ?
                            (<WhiteKey key={note.name} offset={{ x: keyWidth * note.index, y: offsetY }} type={note.type} bounds={whiteKeyBounds} />)
                            :
                            (null)
                        )
                    ) }
                </svg>
            </PianoOffset>
        </Content>
    );
};