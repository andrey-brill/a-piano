
import { React, AResponsiveReact } from '../../chunk-e.js';

import style from './Footer.m.scss';


const ro = {
    lFooterHeight: '13R'
};

export const Footer = () => (
    <AResponsiveReact.ResponsiveElement className={style.footer} roCreator={ro}>
        <span>Copyright © { new Date().getFullYear() } A.Brill. All rights reserved.</span>
    </AResponsiveReact.ResponsiveElement>
)