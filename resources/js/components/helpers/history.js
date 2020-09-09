import { createBrowserHistory } from "history";

class History {
    constructor() {
        this.history = createBrowserHistory();
    }

    static getInstance() {
        if (!History.instance) {
            return History.instance = new History();
        }
        return History.instance;
    }

    static getHistory() {
        return this.getInstance().history;
    }
}

export default () => History.getHistory();

