import { UriStore, KeyStore } from '../stores';

export class Configure {
    private static instance: Configure;

    private constructor() {
        if (Configure.instance) {
            return Configure.instance;
        }
    }

    static get getInstance(): typeof Configure.instance {
        if (!Configure.instance) {
            Configure.instance = new Configure();
        }

        return Configure.instance;
    }

    public header(headers: Record<string, unknown>): Configure {
        KeyStore.getInstance.setData('header', headers);
        return this;
    }

    public getHeader(): Record<string, unknown> {
        return KeyStore.getInstance.getData('header');
    }

    public baseUri(uri: string): Configure {
        UriStore.getInstance.setData(uri.replace(/ /g, ''));
        return this;
    }

    public getBaseUri(): string {
        return UriStore.getInstance.getData();
    }
}
