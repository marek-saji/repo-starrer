import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import '../List/style.css';

const ITEMS_COUNT = 24;

class ListPlaceholder extends PureComponent
{
  static propTypes = {
      children: PropTypes.func.isRequired,
  };

  render ()
  {
      return (
          <ol className="repoList repoList--loading">
              {[...Array(ITEMS_COUNT)].map((_, i) => (
                  <li key={i} className="repoList__item">
                      {this.props.children({})}
                  </li>
              ))}
          </ol>
      );
  }
}

export default ListPlaceholder;
