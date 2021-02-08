import axios, {
    AxiosError,
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
    Method,
} from 'axios';
import { Configure } from '../configure';

type Callback = (
    err: AxiosError<any> | null,
    response: AxiosResponse<any>,
) => void;

export class Router {
    private readonly instance = axios.create();
    private readonly headers = {
        common: Configure.getInstance.getHeader(),
        instance: {},
    };
    private method: Method = 'get';
    private url?: string = '';
    private data: any = {};
    private config: {
        common?: AxiosRequestConfig;
        instance?: AxiosRequestConfig;
    } = {
        common: Configure.getInstance.getConfig(),
        instance: undefined,
    };

    public overrideUrl(url: string) {
        this.url = url.replace(/ /g, '');
        return this;
    }

    public overrideHeader(header: Record<string, unknown>) {
        this.headers.instance = header;
        return this;
    }

    public overrideConfig(config: AxiosRequestConfig) {
        this.config.instance = config;
        return this;
    }

    public uri(uri: string): Router {
        this.url = `${Configure.getInstance.getBaseURL()}${uri.replace(
            / /g,
            '',
        )}`;
        return this;
    }

    public payload(payload: any): Router {
        this.data = payload;
        return this;
    }

    private setMethod(method: Method): Router {
        this.method = method;
        return this;
    }

    private fetch(data?: any): AxiosPromise {
        return new Promise((resolve, reject) => {
            this.instance({
                ...this.config.common,
                ...this.config.instance,
                headers: {
                    ...(this.config?.common?.headers &&
                        this.config?.common?.headers),
                    ...(this.config?.instance?.headers &&
                        this.config?.instance?.headers),
                    ...this.headers.common,
                    ...this.headers.instance,
                },
                method: this.method,
                url: this.url,
                data: data,
            })
                .then((response: AxiosResponse<any>) => resolve(response))
                .catch((err: AxiosError<any>) => reject(err));
        });
    }

    private handleCallback(cb: Callback): any {
        this.fetch(this.data)
            .then((response) => {
                return cb(null, response);
            })
            .catch((err) => {
                return cb(err, err.response as AxiosResponse);
            });
    }

    public get(cb?: Callback): any {
        this.setMethod('get');

        if (cb) {
            return this.handleCallback(cb);
        }

        return this.fetch(this.data);
    }

    public post(cb?: Callback): AxiosPromise {
        this.setMethod('post');

        if (cb) {
            return this.handleCallback(cb);
        }

        return this.fetch(this.data);
    }

    public put(cb?: Callback): AxiosPromise {
        this.setMethod('put');

        if (cb) {
            return this.handleCallback(cb);
        }

        return this.fetch(this.data);
    }

    public delete(cb?: Callback): AxiosPromise {
        this.setMethod('delete');

        if (cb) {
            return this.handleCallback(cb);
        }

        return this.fetch(this.data);
    }

    public patch(cb?: Callback): AxiosPromise {
        this.setMethod('patch');

        if (cb) {
            return this.handleCallback(cb);
        }

        return this.fetch(this.data);
    }

    public form(cb?: Callback): AxiosPromise {
        this.overrideHeader({
            ...this.headers.instance,
            'Content-Type': 'multipart/form-data',
        });

        return this.post(cb);
    }
}
