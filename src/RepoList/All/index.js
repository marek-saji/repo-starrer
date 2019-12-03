import React from 'react';
import NetworkConnector from '../../Connector/Network';
import StoreConnector from '../../Connector/Store';
import List from '../components/List';
import Repo from '../components/Repo';
import NetworkError from '../components/NetworkError';

function RepoListAll ()
{
  const date = new Date();
  date.setDate(date.getDate() - 7);

  return (
    <NetworkConnector since={date}>
      {remote => (
        <StoreConnector>
          {store => {
            const loading = remote.loading || store.loading;

            if (!loading && remote.error) {
              return <NetworkError />;
            }

            let items = [];
            if (!store.loading) {
              items = remote.items.map(item => ({
                ...item,
                favourite: store.isItemFavourite(item),
              }));
            }

            return (
              <List
                loading={loading}
                items={items}
              >
                {item => (
                  <Repo
                    {...item}
                    loading={loading}
                    toggleFavourite={() => store.toggleItemFavourite(item)}
                  />
                )}
              </List>
            );
          }}
        </StoreConnector>
      )}
    </NetworkConnector>
  );
}

export default RepoListAll;
