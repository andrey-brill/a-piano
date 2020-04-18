
import { ReactDom, React } from '../chunk-e.js';
import { Logo } from './base/Logo.jsx';
import { Piano } from './piano/Piano.jsx';
import { ContextProvider } from './base/Context.jsx';
import { Responsiveness } from './base/Responsiveness.jsx';

import './App.scss';


const App = () => (
    <ContextProvider>
        <Responsiveness>
            <Logo/>
            <Piano/>
        </Responsiveness>
    </ContextProvider>
);

export function renderApp (id = 'root') {
    ReactDom.render(<App/>, document.getElementById(id));
}