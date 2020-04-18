
import { React } from '../../chunk-e.js';
import { Context } from '../base/Context.jsx';

import style from './Keys.m.scss';


export const Container = ({ children, settings, setting }) => {

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
        <g className={classNames.join(' ')}
            onClick={ settingValue.onClick }
            onMouseEnter={settingValue.onMouseEnter}
            onMouseLeave={settingValue.onMouseLeave}>
            {children}
        </g>
    );

}