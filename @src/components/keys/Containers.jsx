
import { React } from '../../chunk-e.js';
import { Context } from '../base/Context.jsx';
import { TouchableKey } from '../../base/Constants.js';
import { AbsoluteDiv } from '../base/AbsoluteDiv.jsx';

import style from './Keys.m.scss';


class AbstractContainer extends React.Component {

    static contextType = Context;

    state = {
        pressed: false,
        disabled: false
    }

    render () {

        const { name, offset, className, children, touchable } = this.props;

        const classNames = [style.container];
        if (className) classNames.push(className);
        if (touchable) classNames.push(TouchableKey);
        if (this.state.pressed) classNames.push(style.pressed);
        if (this.state.disabled) classNames.push(style.disabled);

        return (
            <AbsoluteDiv name={name} left={offset.left} top={offset.top} className={classNames.join(' ') }>
                {children}
            </AbsoluteDiv>
        );
    }

    setKeyState (value) {
        this.setState({
            pressed: value.pressed,
            disabled: value.disabled
        });
    }

    listenKeys (keys) {

        const keyName = this.props.name;

        if (!keyName) { // Keyboard Keys can have undefined names
            return;
        }

        this.unsubscribe = keys.onChange( (changedKey, value) => {
            if (changedKey === keyName) {
                this.setKeyState(value)
            }
        });

        this.setKeyState(keys.get(keyName));
    }

    componentWillUnmount () {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
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
