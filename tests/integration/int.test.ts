import {
    Configure,
    Router,
    RouterInstance,
    RouterError,
    RouterResponse,
} from '../../src';

describe('integration', () => {
    describe('get', () => {
        const baseUri = 'https://api.coingecko.com/api/v3/coins';
        const suffix =
            '/markets?vs_currency=krw&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h,24h,7d';
        const header = {
            accessToken: '1234',
            transactionId: '5678',
        };
        let router: RouterInstance;

        beforeAll(() => {
            Configure.getInstance.baseUri(baseUri);
            Configure.getInstance.header(header);
        });

        beforeEach(() => {
            router = new Router();
        });

        it('should route to api', async (done) => {
            router
                .uri(`${suffix}`)
                .get((err: RouterError, response: RouterResponse) => {
                    if (err) {
                        console.log('err:', err.response);
                        done();
                    }

                    expect(response.data.length).toBe(10);
                    done();
                });

            router
                .uri(`${suffix}`)
                .get()
                .then((response: RouterResponse) => {
                    expect(response.data.length).toBe(10);
                    done();
                })
                .catch((err: RouterError) => {
                    console.log(err.response);
                    done();
                });

            try {
                const results: RouterResponse = await router
                    .uri(`${suffix}`)
                    .get();
                expect(results.data.length).toBe(10);
            } catch (e) {
                console.log(e.response.data);
            }
        });
    });

    describe('post', () => {
        const baseUri = 'https://dev.themovill.com';
        const suffix = '/rest/login/manager';
        const payload = {
            phone: '0207007',
            password: 'ahqlffj.11Q',
            loginType: 'WINDOW',
        };
        let router: RouterInstance;

        beforeAll(() => {
            Configure.getInstance.baseUri(baseUri);
        });

        beforeEach(() => {
            router = new Router();
        });

        it('should route to api', async (done) => {
            router
                .uri(`${suffix}`)
                .payload(payload)
                .post((err: RouterError, response: RouterResponse) => {
                    if (err) {
                        expect(err.response).toBeTruthy();
                        done();
                    }

                    expect(response.data).toBeTruthy();
                    done();
                });

            router
                .uri(`${suffix}`)
                .payload(payload)
                .post()
                .then((response: RouterResponse) => {
                    expect(response.data).toBeTruthy();
                })
                .catch((err: RouterError) => {
                    expect(err.response).toBeTruthy();
                })
                .finally(() => done());

            try {
                const response = await router
                    .uri(suffix)
                    .payload(payload)
                    .post();

                expect(response.data).toBeTruthy();
            } catch (e) {
                expect(e.response).toBeTruthy();
            }
        });
    });
});
