
import { Sizes, VisibleKeysInterval, ContentKeysInterval, IsMobile, NumberOfMinimumVisibleKeys } from './Constants.js';
import { Changeable } from '../utils/Changeable.js';


const DefaultSettings = {

    // app settings
    [VisibleKeysInterval]: null,
    [Sizes]: null,
    [IsMobile]: null,
    [NumberOfMinimumVisibleKeys]: null,

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