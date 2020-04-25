
import { ReactDom, React } from '../chunk-e.js';
import { Logo } from './base/Logo.jsx';
import { Piano } from './piano/Piano.jsx';
import { ContextProvider } from './base/Context.jsx';
import { Responsiveness } from './base/Responsiveness.jsx';
import { Footer } from './base/Footer.jsx';
import { TonesLoader } from './base/TonesLoader.jsx';

import './App.scss';


const App = () => (
    <ContextProvider>
        <Responsiveness>
            <Logo/>
            <TonesLoader>
                <Piano/>
                <Footer/>
            </TonesLoader>
        </Responsiveness>
    </ContextProvider>
);

export function renderApp (id = 'root') {
    ReactDom.render(<App/>, document.getElementById(id));
}