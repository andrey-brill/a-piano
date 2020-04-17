
import { Sizes, VisibleKeysInterval, ContentKeysInterval } from './Constants.js';
import { Changeable } from './Changeable.js';


const DefaultSettings = {

    // app settings
    [VisibleKeysInterval]: null,
    [Sizes]: null,

    // user settings
    // [IsRight]: true,
    // [RightContentKeysInterval]: null,
    // [LeftContentKeysInterval]: null
    [ContentKeysInterval]: null
};

export class Settings extends Changeable {

    constructor () {
        super(DefaultSettings);
    }

}