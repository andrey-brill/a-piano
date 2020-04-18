
import { React } from '../../chunk-e.js';
import { Notes } from '../../base/Notes.js';
import { Settings } from '../../base/Settings.js';
import { Tones } from '../../base/Tones.js';


export const Context = React.createContext({});

const ContextValue = {
    notes: new Notes(),
    settings: new Settings(),
    tones: new Tones()
}

export const ContextProvider = ({ children }) => (
    <Context.Provider value={ContextValue}>
        { children }
    </Context.Provider>
);
