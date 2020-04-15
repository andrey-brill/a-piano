
import { AResponsiveReact, AResponsiveContainers, ReactDom, React } from '../chunk-e.js';

import './App.scss';
import { Logo } from './base/Logo.jsx';
import { Piano } from './piano/Piano.jsx';
import { ContextProvider } from './base/Context.jsx';
import { ResponsivePixel } from './base/ResponsivePixel.jsx';
import { DelayRender } from './base/DelayRender.jsx';


const { ResponsiveWindow, ResponsiveElement } = AResponsiveReact;

const App = () => (
    <ContextProvider>
        <ResponsiveWindow>
            <ResponsiveElement id="app" roCreator={AResponsiveContainers.commonProperties()}>
                <ResponsivePixel/>
                <DelayRender> {/* Making sure that responsive pixel was rendered */}
                    <Logo/>
                    <Piano/>
                </DelayRender>
            </ResponsiveElement>
        </ResponsiveWindow>
    </ContextProvider>
);

export function renderApp (id = 'root') {
    ReactDom.render(<App/>, document.getElementById(id));
}