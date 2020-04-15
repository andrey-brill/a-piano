
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
