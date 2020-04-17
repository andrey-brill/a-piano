
import { React } from '../../chunk-e.js';


export const ShadowRect = ({ className, fill, offset, bounds }) => (
    <rect
        className={className}
        fill={fill}
        x={offset.x + bounds.padding}
        y={offset.y + bounds.padding + bounds.height - bounds.radius}
        width={bounds.width}
        height={2 * bounds.radius}
        rx={bounds.radius} />
);

