
import { AResponsiveReact, AResponsiveContainers, ReactDom, React } from '../chunk-e.js';

import './App.scss';
import { Logo } from './Logo.jsx';
import { Content } from './Content.jsx';
import { Piano } from './piano/Piano.jsx';


const { ResponsiveWindow, ResponsiveElement, ResponsiveContainer } = AResponsiveReact;

const container = {
    rcResize: AResponsiveContainers.rcResize
 }

const App = () => (
    <ResponsiveWindow>
        <ResponsiveContainer container={container}>
            <ResponsiveElement id="app" roCreator={AResponsiveContainers.commonProperties()}>
                <Logo/>
                <Content>
                    <Piano/>
                </Content>
            </ResponsiveElement>
        </ResponsiveContainer>
    </ResponsiveWindow>
);

export function renderApp (id = 'root') {
    ReactDom.render(<App/>, document.getElementById(id));
}