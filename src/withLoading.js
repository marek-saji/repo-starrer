import React, { Component } from 'react';
import PropTypes from 'prop-types';

function withLoading (Child, Placeholder)
{
  const childName = Child.displayName || Child.name;

  return (
    class extends Component {
      static displayName = `${childName} withLoading`;

      static propTypes = {
        loading: PropTypes.bool.isRequired,
      };

      render ()
      {
        if (!this.props.loading) {
          return <Child {...this.props} />;
        }

        return (
          <div
            aria-label="Loading…"
            aria-busy="true"
          >
            <div aria-hidden="true">
              <Placeholder {...this.props} />
            </div>
          </div>
        );
      }
    }
  );
}

export default withLoading;
