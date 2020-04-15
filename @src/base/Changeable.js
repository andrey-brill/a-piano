

export class Changeable {

    constructor (state) {

        this.state = Object.assign({}, state);

        this.listeners = [];
    }

    get (property) {
        const value = this.state[property];
        if (value === undefined) {
            throw new Error('Unknown state property: ' + property);
        } else {
            return value;
        }
    }

    set (property, value) {
        if (this.get(property) !== value) {
            this.state[property] = value;
            this.triggerChange(property);
        }
    }

    setAll (object) {

        const changed = [];
        for (let property in object) {

            const value = object[property];

            if (this.get(property) !== value) {
                changed.push(property);
                this.state[property] = value;
            }
        }

        for (let property of changed) {
            this.triggerChange(property);
        }
    }

    apply (property, key, keyValue) {
        const value = this.get(property);
        if (value[key] !== keyValue) {
            value[key] = keyValue;
            this.triggerChange(property);
        }
    }

    onChange = (listener) => {

        this.listeners.push(listener);

        return () => {
            this.listeners = this.listeners.filter(item => item !== listener);
        };
    }

    triggerChange (name) {

        const value = this.get(name);

        for (let listener of this.listeners) {
            listener(name, value);
        }
    }

}