
import { TouchableKey } from './Constants';


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

export function resolveTone (target) {

    if (!target) {
        return null;
    }

    const key = target.closest('.' + TouchableKey);
    return key ? key.getAttribute('name') : null;
}