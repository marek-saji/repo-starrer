import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class FavCheckbox extends Component
{
  static propTypes = {
      name: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
      onChange: PropTypes.func.isRequired,
  };

  render ()
  {
      return (
          <label className="favCheckbox">
              <input
                  type="checkbox"
                  name={this.props.name}
                  checked={this.props.checked}
                  onChange={this.props.onChange}
                  className="favCheckbox__input"
              />
              <span className="favCheckbox__label">
          Favourite
              </span>
          </label>
      );
  }
}

export default FavCheckbox;
