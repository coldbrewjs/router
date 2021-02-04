import { AxiosRequestConfig } from 'axios';
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

    public baseURL(url: string): Configure {
        UriStore.getInstance.setData(url.replace(/ /g, ''));
        return this;
    }

    public getBaseURL(): string {
        return UriStore.getInstance.getData();
    }

    public config(config: AxiosRequestConfig): Configure {
        KeyStore.getInstance.setData(
            'config',
            config as Record<string, unknown>,
        );
        return this;
    }

    public getConfig(): AxiosRequestConfig {
        return KeyStore.getInstance.getData('config');
    }
}
