import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class MainContent extends PureComponent
{
  static propTypes = {
      children: PropTypes.node,
  };

  render ()
  {
      return (
          <main className="mainContent">
              {this.props.children}
          </main>
      );
  }
}

export default MainContent;
