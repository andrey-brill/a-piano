
import { React } from '../../chunk-e.js';
import { ShadowRect } from '../base/ShadowRect.jsx';


export const PianoBlackKey = ({ note, offset, bounds }) => {

    const { whiteKeyOuterWidth, leftOffsets, topHeight } = bounds;

    const leftOffset = leftOffsets[note.letter];

    const keyOffset = {
        x: offset.x + note.index * whiteKeyOuterWidth + leftOffset,
        y: offset.y
    };

    return (
        <g className='black-key' name={name}>
            <ShadowRect fill="#444" offset={keyOffset} bounds={bounds}/>
            <rect
                fill="#555"
                x={keyOffset.x + bounds.padding}
                y={keyOffset.y + bounds.padding}
                width={bounds.width}
                height={bounds.height}
                rx={bounds.radius}/>
            <rect
                fill="#333"
                x={keyOffset.x + bounds.padding}
                y={keyOffset.y + 3 * bounds.padding} // TODO move to css
                width={bounds.width}
                height={topHeight}
                rx={bounds.radius}/>
        </g>
    );
};
