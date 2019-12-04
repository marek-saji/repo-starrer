import React from 'react';
import { Link } from 'react-router-dom';
import { HOME } from '../../../../paths';
import Alert from '../../../../components/Alert';

function EmptyFavouritesRepoList ()
{
  return (
    <Alert heading="Nothing here, yet">
      <p>
        Go
        {' '}
        <Link to={HOME}>browse repositories</Link>
        {' '}
        and star something.
      </p>
    </Alert>
  );
}

export default EmptyFavouritesRepoList;
