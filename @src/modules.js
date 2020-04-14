
import React from 'react';
import ReactDom from 'react-dom';
import * as Tone from 'tone';

import * as AResponsiveContainers from 'a-responsive-containers';
import * as AResponsiveReact from 'a-responsive-react';



const MODULES = {
    'react-dom': ReactDom,
    'react': React,
    'a-responsive-containers': AResponsiveContainers,
    'a-responsive-react': AResponsiveReact,
    'tone': Tone
}

export { MODULES };