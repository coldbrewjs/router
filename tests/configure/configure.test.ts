import { Configure } from '../../lib/configure';

describe('Configure', () => {
    const baseUri = 'https://api.coingecko.com/api/v3/coins';
    const baseUriWithPadding = ' htt ps://a pi.coing ecko.com/api/v3/coins ';
    const header = {
        accessToken: '12345',
        transactionId: '1234',
    };

    it('should save proper uri', () => {
        Configure.getInstance.baseUri(baseUri);
        expect(Configure.getInstance.getBaseUri()).toEqual(baseUri);
    });

    it('should save uri without padding', () => {
        Configure.getInstance.baseUri(baseUriWithPadding);
        expect(Configure.getInstance.getBaseUri()).toEqual(baseUri);
    });

    it('should save header', () => {
        Configure.getInstance.header(header);
        expect(Configure.getInstance.getHeader()).toEqual(header);
    });
});
