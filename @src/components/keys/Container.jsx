
import { React } from '../../chunk-e.js';
import { Context } from '../base/Context.jsx';
import { TouchableKey } from '../../base/Constants.js';
import { AbsoluteDiv } from '../base/AbsoluteDiv.jsx';

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

    const classNames = [ TouchableKey, style.container ];
    if (keyState.pressed) classNames.push(style.pressed);
    if (keyState.disabled) classNames.push(style.disabled);

    return (
        <g name={setting} className={classNames.join(' ')}>
            {children}
        </g>
    );

}


class AbstractContainer extends React.Component {

    static contextType = Context;

    state = {
        pressed: false,
        disabled: false
    }

    render () {

        const { name, offset, className } = this.props;

        const classNames = [];
        if (className) classNames.push(className); // TODO TouchableKey
        if (this.state.pressed) classNames.push(style.pressed);
        if (this.state.disabled) classNames.push(style.disabled);

        return (
            <AbsoluteDiv name={name} left={offset.left} top={offset.top} className={classNames.join(' ') }>
                {children}
            </AbsoluteDiv>
        );
    }

    listenKeys (keys) {

        const keyName = this.props.name;

        keys.onChange( (changedKey, value) => {
            if (changedKey === keyName) {
                setKeyState({
                    pressed: value.pressed,
                    disabled: value.disabled
                })
            }
        });

    }

}


export class PianoKeyContainer extends AbstractContainer {

    componentDidMount () {
        this.listenKeys(this.context.notes);
    }

}


export class KeyboardKeyContainer extends AbstractContainer {

    componentDidMount () {
        this.listenKeys(this.context.keyboardKeys);
    }

}


export class ControlKeyContainer extends AbstractContainer {

    componentDidMount () {
        this.listenKeys(this.context.controlKeys);
    }

}
