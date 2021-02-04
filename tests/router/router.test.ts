import { RouterError, RouterResponse } from '../../lib/types';
import { Router } from '../../lib/router';
import * as fs from 'fs';
import path from 'path';
import FormData from 'form-data';

describe('Router', () => {
    describe('get', () => {
        const baseUri = 'https://api.coingecko.com/api/v3/coins';
        const suffix =
            '/markets?vs_currency=krw&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h,24h,7d';
        let router: typeof Router.prototype;

        beforeEach(() => {
            router = new Router();
        });

        it('should return response with callback', async (done) => {
            router
                .overrideUrl(`${baseUri}${suffix}`)
                .get((err: RouterError, response: RouterResponse) => {
                    if (err) {
                        console.log(err);
                        done();
                    }

                    expect(response.data.length).toBe(10);
                    done();
                });

            router
                .overrideUrl(`${baseUri}${suffix}`)
                .get()
                .then((response: RouterResponse) => {
                    expect(response.data.length).toBe(10);
                    done();
                })
                .catch((err: RouterError) => {
                    console.log(err);
                    done();
                });

            try {
                const result = await router
                    .overrideUrl(`${baseUri}${suffix}`)
                    .get();

                expect(result.data.length).toBe(10);
            } catch (err) {
                console.log(err);
            }
        });
    });

    describe('post', () => {
        const baseUri = 'https://dev.themovill.com/rest/login/manager';
        let router: typeof Router.prototype;
        beforeAll(() => {
            router = new Router();
        });

        it('should login with post method', async (done) => {
            router
                .overrideUrl(baseUri)
                .payload({
                    phone: '',
                    password: '',
                    loginType: '',
                })
                .post((err: any, response: any) => {
                    if (err) {
                        console.log(err.response.data);
                        done();
                    }

                    expect(response.data).toBeTruthy();
                    done();
                });

            router
                .overrideUrl(baseUri)
                .payload({
                    phone: '',
                    password: '',
                    loginType: '',
                })
                .post()
                .then((response: any) => {
                    expect(response.data).toBeTruthy();
                })
                .catch((err: any) => {
                    console.log(err.response.data);
                })
                .finally(() => {
                    done();
                });

            try {
                const response = await router
                    .overrideUrl(baseUri)
                    .payload({
                        phone: '',
                        password: '',
                        loginType: '',
                    })
                    .post();

                expect(response.data).toBeTruthy();
            } catch (e) {
                console.log(e.response.data);
            }
        });
    });

    describe('form', () => {
        it('should post form data', async () => {
            const file = fs.createReadStream(
                path.resolve('./tests/router/sample.pdf'),
            );

            const formData = new FormData();
            formData.append('file', file);

            const router = new Router();
            try {
                const result = await router
                    .overrideHeader({
                        'auth-token': '',
                        ...formData.getHeaders(),
                    })
                    .overrideUrl('')
                    .overrideConfig({
                        timeout: 10000000,
                        maxContentLength: 50000000,
                    })
                    .payload(formData)
                    .post();

                console.log(result.data);
            } catch (err) {
                console.log(err);
            }
        });

        it('should send data using embed form method', async () => {
            const file = fs.createReadStream(
                path.resolve('./tests/router/sample.pdf'),
            );

            const router = new Router();

            try {
                const result = await router
                    .overrideUrl('')
                    .overrideConfig({
                        headers: {
                            'auth-token': '',
                        },
                        timeout: 10000000,
                        maxContentLength: 50000000,
                    })
                    .payload({
                        file: file,
                    })
                    .form();

                console.log(result.data);
            } catch (err) {
                console.log(err);
            }
        });
    });

    describe('Multiple Request', () => {
        const baseUri = 'https://api.coingecko.com/api/v3/coins';
        const suffix = (cnt = 10) =>
            `/markets?vs_currency=krw&order=market_cap_desc&per_page=${cnt}&page=1&sparkline=false&price_change_percentage=1h,24h,7d`;

        it('should call multiple api', (done) => {
            const firstRouter = new Router()
                .uri(`${baseUri}${suffix(10)}`)
                .get();
            const secondRouter = new Router()
                .uri(`${baseUri}${suffix(5)}`)
                .get();
            const thirdRouter = new Router()
                .uri(`${baseUri}${suffix(3)}`)
                .get();

            Promise.all([firstRouter, secondRouter, thirdRouter]).then(
                (response) => {
                    expect((response[0].data as Array<any>).length).toEqual(10);
                    expect((response[1].data as Array<any>).length).toEqual(5);
                    expect((response[2].data as Array<any>).length).toEqual(3);
                    done();
                },
            );
        });
    });
});
