import React from 'react';
import { shallow } from 'enzyme';
import Store from '../Store';

jest.mock('../../storage', () => ({
    __esModule: true,
    default: {
        getItem: jest.fn().mockReturnValue(JSON.stringify([
            [ 1, { id: 1, starCount: 1, favourite: true } ],
            [ 2, { id: 2, starCount: 2, favourite: false } ],
        ])),
        setItem: jest.fn(),
    },
}));

describe('Store', () => {
    it('calls child with loading=true', () => {
        const child = jest.fn().mockReturnValue(null);

        shallow(<Store>{child}</Store>);

        expect(child).toHaveBeenNthCalledWith(
            1,
            expect.objectContaining({
                loading: true,
            })
        );
    });

    it('calls child with loading=false, when loaded', async () => {
        const child = jest.fn().mockReturnValue(null);

        shallow(<Store>{child}</Store>);
        await new Promise(process.nextTick);

        expect(child).toHaveBeenCalledTimes(2);
        expect(child).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({
                loading: false,
            })
        );
    });

    it('sorts items by starCount', async () => {
        const child = jest.fn().mockReturnValue(null);

        shallow(<Store>{child}</Store>);
        await new Promise(process.nextTick);

        expect(child).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({
                loading: false,
                items: [
                    expect.objectContaining({ id: 2 }),
                    expect.objectContaining({ id: 1 }),
                ],
            })
        );
    });

    it('returns only favourite items with favourite=true', async () => {
        const child = jest.fn().mockReturnValue(null);

        shallow(<Store favourite>{child}</Store>);
        await new Promise(process.nextTick);

        expect(child).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({
                loading: false,
                items: [
                    expect.objectContaining({ id: 1 }),
                ],
            })
        );
        expect(child).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({
                items: [
                    expect.not.objectContaining({ id: 2 }),
                ],
            })
        );
    });

    it('returns only non-favourite items with favourite=false', async () => {
        const child = jest.fn().mockReturnValue(null);

        shallow(<Store favourite={false}>{child}</Store>);
        await new Promise(process.nextTick);

        expect(child).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({
                loading: false,
                items: [
                    expect.objectContaining({ id: 2 }),
                ],
            })
        );
        expect(child).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({
                items: [
                    expect.not.objectContaining({ id: 1 }),
                ],
            })
        );
    });
});
