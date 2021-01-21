import { RouterError, RouterResponse } from '../../src/types';
import { Router } from '../../src/router';

describe('Router', () => {
    describe('get', () => {
        const baseUri = 'https://api.coingecko.com/api/v3/coins';
        const tailUri =
            '/markets?vs_currency=krw&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h,24h,7d';
        let router: typeof Router.prototype;

        beforeEach(() => {
            router = new Router();
        });

        it('should return response with callback', async (done) => {
            router
                .overrideUrl(`${baseUri}${tailUri}`)
                .get((err: RouterError, response: RouterResponse) => {
                    if (err) {
                        console.log(err);
                        done();
                    }

                    expect(response.data.length).toBe(10);
                    done();
                });

            router
                .overrideUrl(`${baseUri}${tailUri}`)
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
                    .overrideUrl(`${baseUri}${tailUri}`)
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
                    phone: '0207007',
                    password: 'ahqlffj.11Q',
                    loginType: 'WINDOW',
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
                    phone: '0207007',
                    password: 'ahqlffj.11Q',
                    loginType: 'WINDOW',
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
                        phone: '0207007',
                        password: 'ahqlffj.11Q',
                        loginType: 'WINDOW',
                    })
                    .post();

                expect(response.data).toBeTruthy();
            } catch (e) {
                console.log(e.response.data);
            }
        });
    });
});
