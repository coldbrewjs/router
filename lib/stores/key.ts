import Store from './base';

export class KeyStore extends Store {
    private static instance: KeyStore;
    private store = new Map();

    private constructor() {
        super();

        if (KeyStore.instance) {
            return KeyStore.instance;
        }
    }

    static get getInstance(): typeof KeyStore.instance {
        if (!KeyStore.instance) {
            KeyStore.instance = new KeyStore();
        }

        return KeyStore.instance;
    }

    public getData(key: string): Record<string, unknown> {
        return this.store.get(key);
    }

    public setData(key: string, value: Record<string, unknown>): KeyStore {
        this.store.set(key, value);
        return this;
    }

    public clear(): KeyStore {
        this.store.clear();
        return this;
    }
}
