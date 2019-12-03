import React from 'react';
import { Link } from 'react-router-dom';
import { HOME } from '../../../../paths';
import Alert from '../../../../components/Alert';

function EmptyFavouritesRepoList ()
{
  return (
    <Alert heading="Nothing here, yet">
      <p>
        Repositories starred on the
        {' '}
        <Link to={HOME}>main list</Link>
        {' '}
        will be visible here.
      </p>
    </Alert>
  );
}

export default EmptyFavouritesRepoList;
