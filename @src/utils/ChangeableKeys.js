import { Changeable } from './Changeable';


export class ChangeableKeys extends Changeable {

    disabled (keyName, disabled) {
        this.apply(keyName, 'disabled', disabled);
    }

    pressed (keyName, pressed) {
        this.apply(keyName, 'pressed', pressed);
    }

}