import React from 'react';
import Connector from '../../Connector/Store';
import List from '../components/List';
import Repo from '../components/Repo';
import EmptyList from './components/EmptyList';

function RepoListFavourites ()
{
    return (
        <Connector favourite>
            {store => {
                if (!store.loading && store.items.length === 0)
                {
                    return <EmptyList />;
                }

                return (
                    <List
                        loading={store.loading}
                        items={store.items}
                    >
                        {item => (
                            <Repo
                                {...item}
                                loading={store.loading}
                                toggleFavourite={() => store.toggleItemFavourite(item)}
                            />
                        )}
                    </List>
                );
            }}
        </Connector>
    );
}

export default RepoListFavourites;
