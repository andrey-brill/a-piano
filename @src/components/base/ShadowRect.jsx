
import { React } from '../../chunk-e.js';


export const ShadowRect = ({ className, offset, bounds }) => (
    <rect
        className={className}
        x={offset.x + bounds.padding}
        y={offset.y + bounds.padding + bounds.height - 2 * bounds.radius}
        width={bounds.width}
        height={3 * bounds.radius}
        rx={bounds.radius} />
);

