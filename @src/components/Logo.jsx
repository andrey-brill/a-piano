
import { React } from '../chunk-e.js';
import { Content } from './Content.jsx';

import style from './Logo.m.scss';


const LogoPath = ({ className }) => (
    <g className={className}>
        <path d="M165.071,64.939l5.82-0.12c1.44,0,2.16,0.1,2.16,0.3c0,0.521-2.92,0.98-8.76,1.38c-3.72,7.281-5.58,12.24-5.58,14.88c0,1.839,0.58,2.76,1.74,2.76c0.439,0,0.99-0.27,1.65-0.81s1.06-0.81,1.2-0.81s0.21,0.1,0.21,0.3c-0.201,0.72-0.81,1.32-1.83,1.8s-1.881,0.72-2.58,0.72c-0.7,0-1.25-0.041-1.65-0.12c-0.96-0.36-1.44-1.521-1.44-3.48c0-4.04,1.539-9.18,4.62-15.42l-7.2,0.18c-5.361,5.241-10.74,9.84-16.14,13.8c-8.08,5.88-14.4,8.82-18.96,8.82c-0.28,0-0.561-0.021-0.84-0.06c-6.161-0.521-9.24-3.681-9.24-9.48c0-3.439,1.08-7.08,3.24-10.92c2.88-5.12,6.819-9.489,11.82-13.11c5-3.62,9.48-5.43,13.44-5.43s5.94,1.46,5.94,4.38c0,1.96-0.6,4.14-1.8,6.54s-2.421,3.921-3.66,4.56c-0.12,0.041-0.25,0.06-0.39,0.06c-0.141,0-0.21-0.04-0.21-0.12l1.98-3.24c1.359-2.12,2.04-3.98,2.04-5.58s-0.351-2.89-1.05-3.87c-0.7-0.979-1.811-1.47-3.33-1.47c-3.12,0-6.85,1.74-11.19,5.22c-4.341,3.48-7.641,7.761-9.9,12.84c-2.26,5.081-3.39,9.041-3.39,11.88c0,4.279,2.18,6.42,6.54,6.42c4.16,0,9.8-2.681,16.92-8.04c3.16-2.36,8.3-6.819,15.42-13.38c-1.4,0.081-2.7,0.22-3.9,0.42c-2.56,0.48-3.76,0.4-3.6-0.24c0.16-1.479,0.92-2.22,2.28-2.22c2.64,0.32,4.86,0.48,6.66,0.48c3.44-3.16,8.58-8.34,15.42-15.54c4.599-4.839,7.399-7.26,8.4-7.26c0.439,0,0.66,0.34,0.66,1.02c0,0.681-0.18,1.74-0.54,3.18s-0.761,2.32-1.2,2.64c-0.921,0.64-1.78,1.51-2.58,2.61c-0.801,1.101-1.94,3.16-3.42,6.18C167.371,60.61,166.111,63.06,165.071,64.939z M169.872,50.299l-15.36,14.4h3.54c0.84,0.04,1.879,0.06,3.12,0.06C162.331,62.479,165.231,57.66,169.872,50.299z"/>
        <path d="M178.781,78.919c0.54,0.4,0.81,0.851,0.81,1.35c0,0.5-0.25,0.94-0.75,1.32s-1.05,0.57-1.65,0.57c-0.6,0-1.15-0.21-1.65-0.63s-0.75-0.91-0.75-1.47c0-1.16,0.76-1.74,2.28-1.74C177.671,78.319,178.241,78.52,178.781,78.919z"/>
        <path d="M266.71,55.279c0,2.04-1.02,4.28-3.06,6.72s-5.13,4.42-9.27,5.94c-4.14,1.521-8.16,2.28-12.06,2.28s-6.99-0.5-9.27-1.5c-5.04,7.4-8.32,11.86-9.84,13.38c-4.32,4.32-9.48,6.48-15.48,6.48c-3.4,0-5.95-0.791-7.65-2.37c-1.701-1.581-2.55-3.63-2.55-6.15c0-3.48,1.399-6.759,4.2-9.84c3.08-3.399,6.96-5.1,11.64-5.1c1.92,0,3.54,0.44,4.86,1.32s1.98,2.22,1.98,4.02c0,1.2-0.68,2.64-2.04,4.32s-2.201,2.52-2.52,2.52c-0.081,0-0.12-0.08-0.12-0.24c0-0.159,0.06-0.32,0.18-0.48c1.28-1.88,1.92-3.609,1.92-5.19c0-1.58-0.491-2.799-1.47-3.66c-0.98-0.859-2.19-1.29-3.63-1.29c-3.36,0-6.33,1.53-8.91,4.59s-3.87,6.15-3.87,9.27c0,2,0.63,3.62,1.89,4.86c1.26,1.239,3.21,1.86,5.85,1.86c4.92,0,9.14-1.66,12.66-4.98c2.04-1.92,4.1-4.719,6.18-8.4l5.22-9.42c2.559-4.12,5.54-10.239,8.94-18.36c-0.36,0-0.72,0-1.08,0c-5.4,0-10.821,0.591-16.26,1.77c-5.44,1.181-9.561,2.871-12.36,5.07c-1.2,0.92-1.8,1.82-1.8,2.7s0.47,1.59,1.41,2.13c0.939,0.54,2.049,0.81,3.33,0.81c1.28,0,2.87-0.25,4.77-0.75c1.899-0.5,3.33-1.17,4.29-2.01c0.399-0.32,0.68-0.48,0.84-0.48c0.319,0,0.379,0.16,0.18,0.48c-1.44,1.68-3.621,2.94-6.54,3.78c-1.8,0.521-3.58,0.78-5.34,0.78c-1.761,0-3.201-0.39-4.32-1.17c-1.121-0.78-1.68-1.839-1.68-3.18c0-1.34,0.72-2.689,2.16-4.05c2.72-2.64,7.58-4.6,14.58-5.88c4.959-0.879,10.659-1.32,17.1-1.32c0.52,0,1.06,0,1.62,0c0.879-0.759,1.68-1.14,2.4-1.14s1.08,0.28,1.08,0.84c0,0.12-0.021,0.26-0.06,0.42c6.2,0.44,11.22,1.48,15.06,3.12C264.431,49.699,266.71,52.199,266.71,55.279z M263.891,54.679c0-2.52-2.04-4.58-6.12-6.18c-3.561-1.399-8.02-2.24-13.38-2.52l-1.92,6c-1.521,3.76-4.44,9-8.76,15.72c0.399,0.201,1.08,0.42,2.04,0.66c1.6,0.281,2.84,0.42,3.72,0.42c3.04,0,6.54-0.63,10.5-1.89s7.27-3.1,9.93-5.52C262.561,58.949,263.891,56.719,263.891,54.679z"/>
        <path d="M260.53,82.759c-2.04,0-3.06-1.32-3.06-3.96c0-2.16,1.179-5.15,3.54-8.97c2.359-3.819,4.26-5.75,5.7-5.79c0.399,0,0.85,0.16,1.35,0.48c0.5,0.321,0.75,0.641,0.75,0.96c-0.201,0.28-0.44,0.591-0.72,0.93c-0.281,0.34-0.581,0.71-0.9,1.11c-0.32,0.4-0.76,0.97-1.32,1.71c-0.561,0.741-1.101,1.45-1.62,2.13c-3,3.88-4.5,6.551-4.5,8.01c0,1.46,0.5,2.19,1.5,2.19c0.84,0,1.98-0.459,3.42-1.38c3.36-2.08,6.02-4.359,7.98-6.84c0.72-0.92,1.209-1.38,1.47-1.38c0.26,0,0.39,0.161,0.39,0.48c0,0.321-0.46,0.96-1.38,1.92s-1.65,1.721-2.19,2.28c-0.54,0.561-0.91,0.93-1.11,1.11c-0.201,0.18-0.57,0.521-1.11,1.02c-0.54,0.5-0.951,0.851-1.23,1.05c-0.28,0.2-0.681,0.5-1.2,0.9c-0.52,0.4-0.98,0.69-1.38,0.87s-0.861,0.39-1.38,0.63C262.69,82.579,261.69,82.759,260.53,82.759z M273.1,58.189c0.54,0.381,0.81,0.831,0.81,1.35c0,0.521-0.25,0.97-0.75,1.35c-0.5,0.38-1.05,0.57-1.65,0.57s-1.15-0.219-1.65-0.66c-0.501-0.44-0.75-0.939-0.75-1.5c0-1.12,0.759-1.68,2.28-1.68C271.99,57.619,272.56,57.81,273.1,58.189z"/>
        <path d="M291.91,64.159l0.84-0.18c0.44,0,0.86,0.18,1.26,0.54c0.399,0.36,0.6,0.641,0.6,0.84c0,0.201-1.241,2.13-3.72,5.79c-2.48,3.66-3.72,6.21-3.72,7.65c0,0.12,0.02,0.24,0.06,0.36c0.2,0.92,0.64,1.38,1.32,1.38c2.079,0,5.88-3.439,11.4-10.32c0.12-0.16,0.26-0.24,0.42-0.24s0.24,0.15,0.24,0.45c0,0.3-0.18,0.69-0.54,1.17c-5.121,6.84-9.021,10.26-11.7,10.26c-0.36,0-0.7-0.06-1.02-0.18c-1.761-0.68-2.64-2-2.64-3.96c0-0.68,0.08-1.359,0.24-2.04l-3.72,3.6c-2.36,2.08-4.07,3.12-5.13,3.12s-2.07-0.339-3.03-1.02c-1.08-0.799-1.62-1.86-1.62-3.18c0-2.919,2.04-6.41,6.12-10.47c4.08-4.059,7.819-6.09,11.22-6.09c1.32,0,2.2,0.46,2.64,1.38c0.12,0.321,0.219,0.591,0.3,0.81C291.81,64.049,291.87,64.159,291.91,64.159z M273.97,78.919c0,1.44,0.5,2.16,1.5,2.16c2.319,0,5.479-2.54,9.48-7.62l6.36-8.76c-0.32-0.56-0.84-0.84-1.56-0.84c-2.44,0-5.68,1.89-9.72,5.67S273.97,76.439,273.97,78.919z"/>
        <path d="M306.31,63.139c1.08,0,1.62,0.42,1.62,1.26c0,0.24-0.06,0.48-0.18,0.72c-3.6,5-5.76,8.781-6.48,11.34c9.319-9.319,14.979-13.98,16.98-13.98c0.2-0.039,0.379-0.06,0.54-0.06c1.119,0,1.68,0.501,1.68,1.5c0,0.201-0.04,0.4-0.12,0.6c-0.081,0.201-0.88,1.281-2.4,3.24c-1.76,2.08-3.25,4.08-4.47,6c-1.221,1.92-1.83,3.52-1.83,4.8c0,1.281,0.279,1.92,0.84,1.92c1.76,0,4.82-2.419,9.18-7.26c0.08-0.08,0.219-0.26,0.42-0.54c0.6-0.72,0.96-1.08,1.08-1.08s0.18,0.201,0.18,0.6c0,0.4-0.28,0.92-0.84,1.56c-4.96,5.64-8.48,8.46-10.56,8.46c-1.96,0-2.94-1.08-2.94-3.24c0-2.16,0.8-4.64,2.4-7.44l3.84-6.24c-2.721,2-5.141,4.19-7.26,6.57c-2.121,2.38-4.05,4.69-5.79,6.93c-1.74,2.24-2.75,3.36-3.03,3.36c-0.6,0-1.071-0.25-1.41-0.75c-0.34-0.5-0.51-1.12-0.51-1.86s0.26-1.73,0.78-2.97c0.52-1.239,1.18-2.739,1.98-4.5l-3.6,3.78c-0.879,0.88-1.43,1.32-1.65,1.32c-0.219,0-0.33-0.129-0.33-0.39c0-0.26,0.161-0.549,0.48-0.87c1.48-1.479,2.76-2.899,3.84-4.26c1.04-1.359,3.18-3.96,6.42-7.8C305.529,63.379,305.909,63.139,306.31,63.139z"/>
        <path d="M336.49,69.379c0,1.401-1.341,3.741-4.02,7.02c-3.161,3.88-5.86,5.82-8.1,5.82h-0.96c-1.041,0-1.86-0.54-2.46-1.62c-0.48-0.759-0.72-1.6-0.72-2.52c0-2.4,1.75-5.77,5.25-10.11s6.33-6.51,8.49-6.51c2.04,0,3.06,1.08,3.06,3.24c0,0.561-0.101,1.281-0.3,2.16c0.04,0.12,0.42,0.18,1.14,0.18s1.82-0.379,3.3-1.14c-0.04,0.681-1.62,1.661-4.74,2.94C336.469,69,336.49,69.179,336.49,69.379z M332.589,66.259c-1.36,0-3.291,1.6-5.79,4.8c-2.5,3.201-3.75,5.561-3.75,7.08c0,1.521,0.48,2.28,1.44,2.28c1.719,0,3.9-1.56,6.54-4.68s3.96-5.36,3.96-6.72C334.349,68.659,333.55,67.739,332.589,66.259z"/>
    </g>
);


export const Logo = () => (
    <Content className={style.container}>
        <svg className={style.logo} width="100%" viewBox="0 0 446 128" xmlns="http://www.w3.org/2000/svg">
            <LogoPath className={style.shadow}/>
            <LogoPath className={style.text}/>
        </svg>
    </Content>
);