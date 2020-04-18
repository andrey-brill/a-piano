
import { React } from '../../chunk-e.js';
import { Context } from '../base/Context.jsx';
import { KeyContainer } from './KeyContainer.jsx';


export const PianoKeyContainer = ({ children, settings, setting }) => {

    const { pianoMouse } = React.useContext(Context);

    return (
        <KeyContainer settings={settings} setting={setting} onListeners={pianoMouse.listeners}>
            {children}
        </KeyContainer>
    );

}