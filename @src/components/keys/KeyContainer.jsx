
import { React } from '../../chunk-e.js';
import { Context } from '../base/Context.jsx';

import style from './Keys.m.scss';


export const KeyContainer = ({ children, settings, setting, onListeners = {} }) => {

    const context = React.useContext(Context);
    const settingsObject = context[settings];

    const settingValue = settingsObject.get(setting);
    const [keyState, setKeyState] = React.useState({
        pressed: settingValue.pressed,
        disabled: settingValue.disabled
    });

    React.useEffect(() => settingsObject.onChange( (changedKey, value) => {
        if (changedKey === setting) {
            setKeyState({
                pressed: value.pressed,
                disabled: value.disabled
            })
        }
    }), []);

    const classNames = [ style.container ];
    if (keyState.pressed) classNames.push(style.pressed);
    if (keyState.disabled) classNames.push(style.disabled);

    return (
        <g name={setting} className={classNames.join(' ')} {...onListeners}>
            {children}
        </g>
    );

}