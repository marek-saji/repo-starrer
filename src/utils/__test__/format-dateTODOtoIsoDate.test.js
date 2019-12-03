import { toIsoDate } from '../format-date';

describe('format-date toIsoDate', () => {
    it('works for two digit month and day', () => {
        const date = new Date('3000-11-11');
        const dateString = toIsoDate(date);
        expect(dateString).toBe('3000-11-11');
    });

    it('works for single digit month and day', () => {
        const date = new Date('3000-1-1');
        const dateString = toIsoDate(date);
        expect(dateString).toBe('3000-01-01');
    });
});
