import Store from './base';

export class UriStore extends Store {
    private static instance: UriStore;
    private baseUrl?: string = undefined;

    private constructor() {
        super();

        if (UriStore.instance) {
            return UriStore.instance;
        }
    }

    static get getInstance(): typeof UriStore.instance {
        if (!UriStore.instance) {
            this.instance = new UriStore();
        }

        return UriStore.instance;
    }

    public setData(url: string): this {
        this.baseUrl = url;
        return this;
    }

    public getData(): string | undefined {
        return this.baseUrl;
    }
}
