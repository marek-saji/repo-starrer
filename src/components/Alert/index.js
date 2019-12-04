import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Alert extends PureComponent
{
  static propTypes = {
      heading: PropTypes.string.isRequired,
      children: PropTypes.node,
  };

  static defaultTypes = {
      children: null,
  };

  render ()
  {
      return (
          <div className="alert">
              <h2>{this.props.heading}</h2>
              {this.props.children}
          </div>
      );
  }
}

export default Alert;
