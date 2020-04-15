
import { React } from '../../chunk-e.js';
import { FromKey, PixelWidth } from '../../base/Constants.js';
import { Context } from '../base/Context.jsx';


export const PianoOffset = ({ children }) => {

    const { settings } = React.useContext(Context);

    const [ offset, setOffset ] = React.useState(settings.pwPianoOffset());

    React.useEffect(() => settings.onChange((key) => {
        if (key === FromKey || key === PixelWidth) setOffset(settings.pwPianoOffset());
    }), []);

    return (
        <div style={{marginLeft: offset}}>
            { children }
        </div>
    )
};