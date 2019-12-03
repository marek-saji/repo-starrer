import React from 'react';
import Alert from '../../../components/Alert';

function NetworkError ()
{
  return (
    <Alert heading="Network error">
        <p>Failed to fetch repository list.</p>
    </Alert>
  );
}

export default NetworkError;
