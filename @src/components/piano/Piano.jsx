
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

    return (
        <Content>
            <PianoOffset>
                <svg viewBox={`0 0 ${width} ${height}`} style={strictSize(width, height)} xmlns="http://www.w3.org/2000/svg">
                    { notes.map( (note) => <WhiteKey key={note.name} index={note.index} type={note.type} /> )}
                </svg>
            </PianoOffset>
        </Content>
    );
};