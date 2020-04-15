
import { React } from '../../chunk-e.js';
import { KeyWidth, CornerRadius, WhiteKeyHeight, WhiteKeyCutoutHeight, Padding, KeyOuterWidth } from '../../base/Constants.js';
import { PathBuilder } from './PathBuilder.js';


const DefaultOffset = Object.freeze({ x: 0, y: 0 });


export const WhiteKey = ({ name, type, offset, bounds }) => {

    // make <KeyState pressed={}><KeyNote/>
    // try use one .m.scss file for sharing css classes (.white-key .white-key-shadow)
    return (
        <g className='white-key' name={name}>
            <ShadowRect offset={offset} bounds={bounds}/>
            <path fill="#fff" d={createWhiteKeyPathData(type, offset, bounds)}/>
        </g>
    );
};

export const BlackKey = ({ name, offset, bounds }) => {

    // make <KeyState pressed={}><KeyNote/>
    // try use one .m.scss file for sharing css classes (.white-key .white-key-shadow)
    return (
        <g className='black-key' name={name}>
            <rect
                fill="#000"
                x={offset.x + bounds.padding}
                y={offset.y + bounds.padding}
                width={bounds.width}
                height={bounds.height}
                rx={bounds.radius}/>
        </g>
    );
};

const ShadowRect = ({ offset = DefaultOffset, bounds }) => (
    <rect
        fill="#888"
        x={offset.x + bounds.padding}
        y={offset.y + bounds.padding + bounds.height - bounds.radius}
        width={bounds.width}
        height={2 * bounds.radius}
        rx={bounds.radius}/>
);



function createWhiteKeyPathData (type, offset = DefaultOffset, bounds) {

    const { height, width, padding, radius } = bounds;

    const { wl, wc, wr } = resolveWidths(type, width);

    const k = WhiteKeyCutoutHeight / WhiteKeyHeight;
    const cutoutHeight = height * k;
    const unCutoutHeight = height - cutoutHeight;

    const d = 2 * radius, r = radius;

    const path = new PathBuilder()
        .M(offset.x + padding, offset.y + height + padding - radius)
        .a(r,r)
        .h(width - d)
        .a(r,-r)

    if (wr > 0) {
        path
            .v(-unCutoutHeight + d)
            .a(-r,-r)
            .h(- wr + d)
            .a(-r,-r, 1)
            .v(- cutoutHeight + d);
    } else {
        path
            .v(-height + d)
    }

    path
        .a(-r,-r)
        .h(- wc + d)
        .a(-r, r);

    if (wl > 0) {
        path
            .v(cutoutHeight - d)
            .a(-r, r, 1)
            .h(- wl + d)
            .a(-r, r)
            .v(unCutoutHeight - d);
    } else {
        path
            .v(height - d);
    }

    path.close();
    return path.build();
}


function resolveWidths (type = 'L', width) {

    let left = 0, right = 0;

    // Left, inCenter, Right
    switch (type) {
        case '-':
            break;
        case 'L':
            right = 14;
            break;
        case 'C':
            left = right = 6;
            break;
        case 'R':
            left = 14;
            break;
        case 'CL':
            left = 6;
            right = 10;
            break;
        case 'CR':
            right = 6;
            left = 10;
            break;
        default:
            throw new Error('Unknown note type: ' + type);
    }

    const wl = left * width / KeyWidth;
    const wr = right * width / KeyWidth;
    return {
        wl,
        wc: width - wl - wr,
        wr
    };
}

