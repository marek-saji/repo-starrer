import React from 'react';
import { shallow } from 'enzyme';
import RepoListAll from '..';
import NetworkError from '../../components/NetworkError';
import NetworkConnector from '../../../Connector/Network';
import StoreConnector from '../../../Connector/Store';
import List from '../../components/List';
import Repo from '../../components/Repo';

describe('RepoList/All (network success)', () => {
    it('displays error when fetch fails', () => {
        const repoListAll = shallow(<RepoListAll />);

        const content = repoListAll
            .find(NetworkConnector)
            .renderProp('children')({
                loading: false,
                error: new Error(),
            })
            .find(StoreConnector)
            .renderProp('children')({
                loading: false,
            });

        expect(content.find(NetworkError)).toHaveLength(1);
    });

    it('renders List', () => {
        const repoListAll = shallow(<RepoListAll />);

        const content = repoListAll
            .find(NetworkConnector)
            .renderProp('children')({
                loading: false,
                items: [],
            })
            .find(StoreConnector)
            .renderProp('children')({
                loading: false,
            });

        expect(content.find(List)).toHaveLength(1);
    });

    it('renders Repo', () => {
        const repoListAll = shallow(<RepoListAll />);

        const content = repoListAll
            .find(NetworkConnector)
            .renderProp('children')({
                loading: false,
                items: [],
            })
            .find(StoreConnector)
            .renderProp('children')({
                loading: false,
            })
            .find(List)
            .renderProp('children')({
                item: {}
            });

        expect(content.find(Repo)).toHaveLength(1);
    });

    it('renders loading List when both connectors are loading', () => {
        const repoListAll = shallow(<RepoListAll />);

        const content = repoListAll
            .find(NetworkConnector)
            .renderProp('children')({
                loading: true,
                items: [],
            })
            .find(StoreConnector)
            .renderProp('children')({
                loading: true,
            });
        const list = content.find(List);

        expect(list.prop('loading')).toBe(true);
    });

    it('renders loading Repo when both connectors are loading', () => {
        const repoListAll = shallow(<RepoListAll />);

        const content = repoListAll
            .find(NetworkConnector)
            .renderProp('children')({
                loading: true,
                items: [],
            })
            .find(StoreConnector)
            .renderProp('children')({
                loading: true,
            });
        const list = content.find(List);
        const repo = list
            .renderProp('children')({});

        expect(repo.prop('loading')).toBe(true);
    });

    it('renders loading List when only network connector is loading', () => {
        const repoListAll = shallow(<RepoListAll />);

        const content = repoListAll
            .find(NetworkConnector)
            .renderProp('children')({
                loading: true,
                items: [],
            })
            .find(StoreConnector)
            .renderProp('children')({
                loading: false,
            });
        const list = content.find(List);

        expect(list.prop('loading')).toBe(true);
    });

    it('renders loading Repo when only network connector is loading', () => {
        const repoListAll = shallow(<RepoListAll />);

        const content = repoListAll
            .find(NetworkConnector)
            .renderProp('children')({
                loading: false,
                items: [],
            })
            .find(StoreConnector)
            .renderProp('children')({
                loading: true,
            });
        const list = content.find(List);
        const repo = list
            .renderProp('children')({});

        expect(repo.prop('loading')).toBe(true);
    });

    it('renders loading List when only store connector is loading', () => {
        const repoListAll = shallow(<RepoListAll />);

        const content = repoListAll
            .find(NetworkConnector)
            .renderProp('children')({
                loading: false,
                items: [],
            })
            .find(StoreConnector)
            .renderProp('children')({
                loading: true,
            });
        const list = content.find(List);

        expect(list.prop('loading')).toBe(true);
    });

    it('renders loading Repo when only store connector is loading', () => {
        const repoListAll = shallow(<RepoListAll />);

        const content = repoListAll
            .find(NetworkConnector)
            .renderProp('children')({
                loading: true,
                items: [],
            })
            .find(StoreConnector)
            .renderProp('children')({
                loading: false,
            });
        const list = content.find(List);
        const repo = list
            .renderProp('children')({});

        expect(repo.prop('loading')).toBe(true);
    });

    it('renders loaded List when both connectors are loaded', () => {
        const repoListAll = shallow(<RepoListAll />);

        const content = repoListAll
            .find(NetworkConnector)
            .renderProp('children')({
                loading: false,
                items: [],
            })
            .find(StoreConnector)
            .renderProp('children')({
                loading: false,
            });
        const list = content.find(List);

        expect(list.prop('loading')).toBe(false);
    });

    it('renders loaded Repo when both connectors are loaded', () => {
        const repoListAll = shallow(<RepoListAll />);

        const content = repoListAll
            .find(NetworkConnector)
            .renderProp('children')({
                loading: false,
                items: [],
            })
            .find(StoreConnector)
            .renderProp('children')({
                loading: false,
            });
        const list = content.find(List);
        const repo = list
            .renderProp('children')({});

        expect(repo.prop('loading')).toBe(false);
    });

    it('passes items to List', () => {
        const repoListAll = shallow(<RepoListAll />);

        const content = repoListAll
            .find(NetworkConnector)
            .renderProp('children')({
                loading: false,
                items: [
                    { id: 1 },
                    { id: 2 },
                ],
            })
            .find(StoreConnector)
            .renderProp('children')({
                loading: false,
                isItemFavourite: jest.fn(),
            });
        const list = content.find(List);

        expect(list.prop('items')).toHaveLength(2);
        expect(list.prop('items')).toMatchObject([
            { id: 1 },
            { id: 2 },
        ]);
    });

    it('sets favourite on fetched items', () => {
        const isItemFavourite = jest.fn().mockReturnValue('test');
        const repoListAll = shallow(<RepoListAll />);

        const content = repoListAll
            .find(NetworkConnector)
            .renderProp('children')({
                loading: false,
                items: [
                    { id: 1 },
                    { id: 2 },
                ],
            })
            .find(StoreConnector)
            .renderProp('children')({
                loading: false,
                isItemFavourite,
            });
        const list = content.find(List);

        expect(isItemFavourite).toHaveBeenCalledTimes(2);
        expect(isItemFavourite).toHaveBeenCalledWith(
            expect.objectContaining({ id: 1})
        );
        expect(isItemFavourite).toHaveBeenCalledWith(
            expect.objectContaining({ id: 2 })
        );
        expect(list.prop('items')).toHaveLength(2);
        expect(list.prop('items')).toContainEqual(
            { id: 1, favourite: 'test' }
        );
        expect(list.prop('items')).toContainEqual(
            { id: 2, favourite: 'test' }
        );
    });

    it('passes toggleFavourite to Repo', () => {
        const toggleItemFavourite = jest.fn().mockReturnValue('test');
        const repoListAll = shallow(<RepoListAll />);

        const content = repoListAll
            .find(NetworkConnector)
            .renderProp('children')({
                loading: false,
                items: [],
            })
            .find(StoreConnector)
            .renderProp('children')({
                loading: false,
                toggleItemFavourite,
            });
        const list = content.find(List);
        const repo = list.renderProp('children')({ id: 1 }).find(Repo);

        repo.prop('toggleFavourite')();

        expect(toggleItemFavourite).toHaveBeenCalledWith({ id : 1 });
    });
});
