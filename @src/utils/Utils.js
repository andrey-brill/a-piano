
import { TouchableKey, Name } from '../base/Constants.js';


export function strictWidth (width) {
    return {
        width,
        minWidth: width,
        maxWidth: width
    };
}

export function strictHeight (height) {
    return {
        height,
        minHeight: height,
        maxHeight: height
    };
}

export function strictSize (width, height) {
    return Object.assign(strictWidth(width), strictHeight(height));
}

export function safeNumber (value, min, max) {
    return Math.max(min, Math.min(max, value));
}

export function resolveKeyName (target) {

    if (!target) {
        return null;
    }

    const key = target.closest('.' + TouchableKey);
    return key ? key.getAttribute(Name) : null;
}

export function indexBy (objects, property) {

    const objectsByName = {};

    for (let object of objects) {

        if (objectsByName[object[property]]) {
            throw new Error('Not unique property: ' + object[property]);
        }

        objectsByName[object[property]] = object;
    }

    return objectsByName;
}

export function nvlNumber (value, defaultValue) {
    return isNaN(value) ? defaultValue : value;
}