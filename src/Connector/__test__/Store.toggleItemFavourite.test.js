import React from 'react';
import { shallow } from 'enzyme';
import Store from '../Store';
import storage from '../../storage';

jest.mock('../../storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn().mockReturnValue(JSON.stringify([
      [ 1, { id: 1, favourite: true } ],
      [ 2, { id: 2, favourite: true } ],
    ])),
    setItem: jest.fn(),
  },
}));

describe('Store, toggleItemFavourite()', () => {
  it('removes favourite item', async () => {
    let toggleItemFavourite;
    const child = jest.fn(store => {
      toggleItemFavourite = store.toggleItemFavourite;
      return null;
    });

    shallow(<Store>{child}</Store>);
    await new Promise(process.nextTick);
    toggleItemFavourite({ id: 1, favourite: true });

    expect(storage.setItem).toHaveBeenLastCalledWith(
      'items',
      JSON.stringify([
        [2, { id: 2, favourite: true } ],
      ])
    );
  });

  it('adds non-favourite item', async () => {
    let toggleItemFavourite;
    const child = jest.fn(store => {
      toggleItemFavourite = store.toggleItemFavourite;
      return null;
    });

    shallow(<Store>{child}</Store>);
    await new Promise(process.nextTick);
    toggleItemFavourite({ id: 3 });

    expect(storage.setItem).toHaveBeenLastCalledWith(
      'items',
      JSON.stringify([
        [1, { id: 1, favourite: true } ],
        [2, { id: 2, favourite: true } ],
        [3, { id: 3, favourite: true } ],
      ])
    );
  });
});
