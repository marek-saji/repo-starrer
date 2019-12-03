import React from 'react';
import { shallow } from 'enzyme';
import Store from '../Store';

jest.mock('../../storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn().mockReturnValue(JSON.stringify([
      [ 1, { id: 1, favourite: true } ],
      [ 2, { id: 2, favourite: false } ],
    ])),
    setItem: jest.fn(),
  },
}));

describe('Store, isItemFavourite()', () => {
  it('returns false for items not in store', async () => {
    expect.hasAssertions();

    let isItemFavourite;
    const child = jest.fn(store => {
      isItemFavourite = store.isItemFavourite;
      return null;
    });

    shallow(<Store>{child}</Store>);
    await new Promise(process.nextTick);
    const result = isItemFavourite({ id: 3 });

    expect(result).toBe(false);
  });

  it('returns false for non-favourite items in store', async () => {
    expect.hasAssertions();

    let isItemFavourite;
    const child = jest.fn(store => {
      isItemFavourite = store.isItemFavourite;
      return null;
    });

    shallow(<Store>{child}</Store>);
    await new Promise(process.nextTick);
    const result = isItemFavourite({ id: 2 });

    expect(result).toBe(false);
  });

  it('returns true for favourite items in store', async () => {
    expect.hasAssertions();

    let isItemFavourite;
    const child = jest.fn(store => {
      isItemFavourite = store.isItemFavourite;
      return null;
    });

    shallow(<Store>{child}</Store>);
    await new Promise(process.nextTick);
    const result = isItemFavourite({ id: 1 });

    expect(result).toBe(true);
  });
});
