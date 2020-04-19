
import { React } from '../../chunk-e.js';
import { strictWidth } from '../../utils/Utils.js';

import style from './Content.m.scss';


export const Content = ({ width, children }) => (
    <div className={style.content} style={strictWidth(width)}>
        { children }
    </div>
);